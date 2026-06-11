import { cursors } from '~~/server/database/schema'
import moment from 'moment'
import { lt } from 'drizzle-orm'

export default defineTask({
  meta: {
    name: 'db:cleanup',
    description: 'Clean the database for cursors that haven\'t been updated in a while'
  },
  async run() {
    console.log('Cleaning up db')

    const driz = useDrizzle()
    const cutoff = moment().add(-15, 'minutes').toDate()
    const deleted = await driz.delete(cursors).where(lt(cursors.lastUpdated, cutoff))
    console.log('Deleted', deleted.rowCount, 'cursors')
    return { result: 'Success' }
  }
})
