// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
      '@vite-pwa/nuxt',
      'nuxt-typed-router',
      '@pinia/nuxt'
  ],

  imports: {
      dirs: ['stores']
  },

  // TODO configure PWA
  pwa: {
      manifest: {
          short_name: 'Civ VII club',
      }
  },

  app: {
      head: {
          title: 'Civ VII club',
      }
  },

  css: ['~/assets/main.sass'],

  runtimeConfig: {
      public: {
          minecrafServerHost: process.env.MINECRAFT_SERVER_HOST
      }
  },

  routeRules: {
      '/map/main': { redirect: process.env.MINECRAFT_MAP_HOST },
      '/map/:match*': { redirect: `${process.env.MINECRAFT_MAP_HOST}/:match*` },
  },

  typescript: {
      strict: true
  },

  compatibilityDate: '2025-01-17'
})
