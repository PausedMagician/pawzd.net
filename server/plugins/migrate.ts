import { defineNitroPlugin } from 'nitropack/runtime'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

export default defineNitroPlugin((_nitroApp) => {
  const driz = useDrizzle()

  if (import.meta.dev) {
    console.log('Dev migrations')
    migrate(driz, { migrationsFolder: './server/database/dev/migrations' })
  } else {
    migrate(driz, { migrationsFolder: './server/database/migrations' })
  }
})
