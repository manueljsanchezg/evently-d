import { desc } from 'drizzle-orm'
import { preventas } from '../../database/schema'
import { db, ensureDatabase } from '../../database'
import { verifyAdminSession } from '../../utils/admin-session'

export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'evently_admin')
  if (!verifyAdminSession(session)) {
    throw createError({ statusCode: 401, statusMessage: 'Inicia sesión en el panel de administración' })
  }

  await ensureDatabase()
  const rows = await db.select().from(preventas).orderBy(desc(preventas.createdAt))
  return rows
})
