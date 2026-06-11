import { z } from 'zod'
import { cursors } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { page } = await getValidatedRouterParams(event, z.object({
    page: z.string()
  }).parse)

  const { x, y } = await readValidatedBody(event, z.object({
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100)
  }).parse)

  const sessionId = getCookie(event, 'session_id')
  if (!sessionId) return sendError(event, {
    statusCode: 401,
    name: 'Missing session_id cookie',
    message: 'uh'
  })

  const driz = useDrizzle()

  return await driz.insert(cursors).values({ id: sessionId, page: page, x: x, y: y }).onConflictDoUpdate({ target: cursors.id, set: { page: page, x: x, y: y } })
})
