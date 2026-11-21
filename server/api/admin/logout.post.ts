export default defineEventHandler((event) => {
  deleteCookie(event, 'evently_admin', { path: '/' })
  return { success: true }
})
