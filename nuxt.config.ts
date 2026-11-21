// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Evently — Conecta · Reserva · Celebra',
      htmlAttrs: { lang: 'es' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap' }
      ],
      script: [
        { src: 'https://cdn.tailwindcss.com' },
        {
          innerHTML: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    navy: '#071932',
                    navyLight: '#0f294d',
                    cream: '#FEF9E7',
                    creamSoft: '#FFFDF7',
                    gold: '#D4AF37',
                    goldDark: '#B89225'
                  },
                  fontFamily: {
                    serif: ['"Playfair Display"', 'serif'],
                    sans: ['"Plus Jakarta Sans"', 'sans-serif']
                  }
                }
              }
            }
          `
        }
      ]
    }
  }
})
