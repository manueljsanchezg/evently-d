import { desc } from 'drizzle-orm'
import { preventas } from '../database/schema'
import { db, ensureDatabase } from '../database'
import { verifyAdminSession } from '../utils/admin-session'

export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'evently_admin')
  const authenticated = verifyAdminSession(session)

  let rows: typeof preventas.$inferSelect[] = []
  if (authenticated) {
    await ensureDatabase()
    rows = await db.select().from(preventas).orderBy(desc(preventas.createdAt))
  }

  const html = `<!doctype html>
  <html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Panel de preventa — Evently</title>
    <style>
      :root{--navy:#071932;--navylight:#0f294d;--cream:#fef9e7;--creamsoft:#fffdf7;--gold:#d4af37}
      *{box-sizing:border-box}body{margin:0;background:var(--cream);color:var(--navy);font-family:Arial,sans-serif}
      header{height:80px;background:var(--navy);color:var(--cream);display:flex;align-items:center;justify-content:space-between;padding:0 max(24px,calc((100vw - 1120px)/2));box-shadow:0 4px 14px #07193233}
      .brand{font-family:Georgia,serif;font-size:28px;font-weight:bold}.brand span{color:var(--gold);font-size:12px;margin-left:8px}
      main{max-width:1120px;margin:48px auto;padding:0 24px}.card{background:var(--creamsoft);border:1px solid #d4af3759;border-radius:18px;padding:28px;box-shadow:0 8px 30px #07193212}
      h1{font-family:Georgia,serif;font-size:36px;margin:0 0 8px}.subtitle{color:#07193299;margin:0 0 28px}
      .login{max-width:430px;margin:80px auto}.field{display:grid;gap:8px;margin-bottom:16px}.field label{font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.08em}
      input{width:100%;border:1px solid #07193233;border-radius:12px;background:white;padding:12px 14px;font-size:15px}button{border:0;border-radius:999px;background:var(--gold);color:var(--navy);font-weight:bold;padding:12px 18px;cursor:pointer}
      .logout{background:#071932;color:var(--cream);font-size:13px}.toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.count{background:#07193212;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:bold}
      table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:14px 12px;border-bottom:1px solid #07193215}th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#07193299}td{font-size:14px}.empty{text-align:center;padding:50px;color:#07193280}
      .error{color:#a53b3b;font-size:13px;min-height:18px;margin:12px 0}@media(max-width:700px){table{min-width:650px}.tablewrap{overflow-x:auto}}
    </style>
  </head>
  <body>
    <header><div class="brand">evently <span>ADMIN</span></div>${authenticated ? '<button class="logout" id="logout">Cerrar sesión</button>' : ''}</header>
    <main>
      ${authenticated ? `
        <div class="card">
          <div class="toolbar"><div><h1>Lista de preventa</h1><p class="subtitle">Personas registradas para acceso anticipado.</p></div><span class="count">${rows.length} ${rows.length === 1 ? 'registro' : 'registros'}</span></div>
          <div class="tablewrap"><table><thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Celebración</th><th>Fecha</th></tr></thead><tbody>
            ${rows.length ? rows.map(row => `<tr><td>${row.id}</td><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.email)}</td><td>${escapeHtml(row.celebration)}</td><td>${escapeHtml(row.createdAt)}</td></tr>`).join('') : '<tr><td class="empty" colspan="5">Todavía no hay registros de preventa.</td></tr>'}
          </tbody></table></div>
        </div>` : `
        <form class="card login" id="login">
          <h1>Acceso admin</h1><p class="subtitle">Introduce la contraseña configurada en el servidor.</p>
          <div class="field"><label for="password">Contraseña</label><input id="password" name="password" type="password" required></div>
          <button type="submit">Entrar</button><p class="error" id="error"></p>
        </form>`}
    </main>
    <script>
      const login = document.getElementById('login');
      if (login) login.addEventListener('submit', async (event) => {
        event.preventDefault();
        const error = document.getElementById('error');
        error.textContent = '';
        try {
          const response = await fetch('/api/admin/login', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:document.getElementById('password').value})});
          if (!response.ok) throw new Error((await response.json()).statusMessage || 'No se pudo iniciar sesión');
          window.location.reload();
        } catch (caught) { error.textContent = caught.message; }
      });
      const logout = document.getElementById('logout');
      if (logout) logout.addEventListener('click', async () => {
        await fetch('/api/admin/logout', {method:'POST'});
        window.location.reload();
      });
    <\/script>
  </body></html>`

  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  return html
})

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
