import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  if (import.meta.dev) {
    return drizzle('postgresql://postgres:postgres@localhost/pawzd.net', { schema })
  } else {
    return drizzle(process.env.DATABASE_URL!, { schema })
  }
}

export type Cursor = typeof schema.cursors.$inferSelect
