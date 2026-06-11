import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'pawzd.net'
  },
  schema: './server/database/schema.ts',
  out: './server/database/dev/migrations'
})
