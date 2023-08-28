// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@kevinmarrec/nuxt-pwa',
        'nuxt-typed-router',
        '@pinia/nuxt'
    ],
    imports: {
        dirs: ['stores']
    },
    pwa: {
        manifest: {
            short_name: 'Civ V club'
        }
    },
    app: {
        head: {
            title: 'Civ V club',
        }
    },
    css: ['~/assets/main.sass'],
    pinia: {
        autoImports: [
            'defineStore', 'storeToRefs'
        ],
    },
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
    }
})
