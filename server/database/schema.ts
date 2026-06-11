import { index, varchar, pgTable, timestamp, uuid, real } from 'drizzle-orm/pg-core'

export const cursors = pgTable('cursors', {
  id: uuid().primaryKey(),
  page: varchar({ length: 255 }).notNull(),
  x: real().notNull(),
  y: real().notNull(),
  lastUpdated: timestamp().notNull().defaultNow().$onUpdateFn(() => new Date())
}, table => [
  index('page_idx').on(table.page),
  index('updated_idx').on(table.lastUpdated)
])
