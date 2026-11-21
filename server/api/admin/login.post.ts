import { timingSafeEqual } from 'node:crypto'
import { createAdminSession } from '../../utils/admin-session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const password = typeof body.password === 'string' ? body.password : ''
  const configured = process.env.ADMIN_PASSWORD

  if (!configured || configured === 'change-me-now') {
    throw createError({ statusCode: 503, statusMessage: 'Configura ADMIN_PASSWORD en el archivo .env' })
  }

  const provided = Buffer.from(password)
  const expected = Buffer.from(configured)
  const valid = provided.length === expected.length && timingSafeEqual(provided, expected)

  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Contraseña incorrecta' })
  }

  setCookie(event, 'evently_admin', createAdminSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8
  })

  return { success: true }
})
