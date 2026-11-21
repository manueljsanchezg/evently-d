import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const url = process.env.TURSO_DATABASE_URL || 'file:local.db'
const authToken = process.env.TURSO_AUTH_TOKEN || undefined

const client = createClient({ url, authToken })
export const db = drizzle(client, { schema })

let tableReady: Promise<void> | undefined

export function ensureDatabase() {
  if (!tableReady) {
    tableReady = client.execute(`
      CREATE TABLE IF NOT EXISTS preventas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        celebration TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `).then(() => undefined)
  }
  return tableReady
}
