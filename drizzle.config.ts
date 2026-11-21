import { defineConfig } from 'drizzle-kit'

const nodeProcess = (globalThis as typeof globalThis & {
  process?: { env: Record<string, string | undefined> }
}).process

export default defineConfig({
  schema: './server/database/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: nodeProcess?.env.TURSO_DATABASE_URL || 'file:local.db',
    authToken: nodeProcess?.env.TURSO_AUTH_TOKEN || undefined
  }
})