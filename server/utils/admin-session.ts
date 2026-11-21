import { createHmac, timingSafeEqual } from 'node:crypto'

function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || ''
  return createHmac('sha256', secret).update(value).digest('base64url')
}

export function createAdminSession() {
  const payload = `${Date.now()}`
  return `${payload}.${sign(payload)}`
}

export function verifyAdminSession(session?: string) {
  if (!session) return false
  const secret = process.env.ADMIN_SESSION_SECRET || ''
  if (!secret || secret === 'change-this-secret-in-production') return false

  const separator = session.lastIndexOf('.')
  if (separator < 1) return false
  const payload = session.slice(0, separator)
  const signature = session.slice(separator + 1)

  let timestamp: number
  try {
    timestamp = Number(payload)
  } catch {
    return false
  }
  if (!Number.isFinite(timestamp)) return false
  if (Date.now() - timestamp > 8 * 60 * 60 * 1000) return false

  const expected = createHmac('sha256', secret).update(payload).digest('base64url')
  const suppliedBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  return suppliedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(suppliedBuffer, expectedBuffer)
}
