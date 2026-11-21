import { preventas } from '../database/schema'
import { db, ensureDatabase } from '../database'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const celebration = typeof body.celebration === 'string' ? body.celebration.trim() : ''

  if (name.length < 2 || name.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Nombre no válido' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw createError({ statusCode: 400, statusMessage: 'Correo electrónico no válido' })
  }
  if (!celebration || celebration.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Celebración no válida' })
  }

  await ensureDatabase()
  await db.insert(preventas).values({ name, email, celebration })

  setResponseStatus(event, 201)
  return { success: true }
})
