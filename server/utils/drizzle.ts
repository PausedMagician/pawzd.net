import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from '../database/schema'
import { Pool } from 'pg'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

const pool = new Pool({
  connectionString: import.meta.dev
    ? 'postgresql://postgres:postgres@localhost/pawzd.net'
    : process.env.DATABASE_URL
})

const driz = drizzle(pool, { schema })

export function useDrizzle() {
  return driz
}

export type Cursor = typeof schema.cursors.$inferSelect
