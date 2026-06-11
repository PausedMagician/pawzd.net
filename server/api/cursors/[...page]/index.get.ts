import { cursors } from '~~/server/database/schema'
import { z } from 'zod'
import { ilike, gt, desc } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { Pool } from 'pg'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function listCursors(driz: NodePgDatabase<typeof import('~~/server/database/schema')> & { $client: Pool }, page: string) {
  return await driz.select().from(cursors).where(ilike(cursors.page, page))
}

export default defineEventHandler(async (event) => {
  // let start = performance.now()
  const { page } = await getValidatedRouterParams(event, z.object({
    page: z.string()
  }).parse)
  // console.log('Validation:', performance.now() - start)

  // start = performance.now()
  const driz = useDrizzle()
  // console.log('Driz get:', performance.now() - start)

  if (getHeader(event, 'accept') === 'text/event-stream') {
    setHeader(event, 'content-type', 'text/event-stream')
    const body = new ReadableStream({
      async start(controller) {
        let lastUpdate = new Date()
        while (true) {
          try {
            // if ((await stream.read()).done) {
            //   return
            // }
            const newestUpdates = await driz.select(
              { lastUpdated: cursors.lastUpdated }
            ).from(cursors)
              .where(gt(cursors.lastUpdated, lastUpdate))
              .orderBy(desc(cursors.lastUpdated))

            if (newestUpdates.length === 0) continue
            lastUpdate = newestUpdates.at(0)!.lastUpdated

            const allCursors = await listCursors(driz, page)
            const chunk = `data: ${JSON.stringify(allCursors)}\n\n`
            controller.enqueue(new TextEncoder().encode(chunk))
            await sleep(1000)
          } catch (e) {
            console.error(`Error checking cursors for '${page}'`, e)
            controller.close()
            break
          }
        }
      },
      cancel() {
        // Uhh, dead?
      }
    })

    return sendStream(event, body)
  }
  // start = performance.now()
  const data = await listCursors(driz, page)
  // console.log('Data get:', performance.now() - start)
  return data
})
