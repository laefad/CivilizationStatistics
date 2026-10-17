// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    modules: [
        'nuxt-typed-router',
        '@pinia/nuxt'
    ],

    imports: {
        dirs: ['stores']
    },

    app: {
        head: {
            title: 'Civ VII club',
        },
        baseURL:  process.env.NUXT_APP_BASE_URL || '/'
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
        // Customize app/server TypeScript config
        tsConfig: {
            compilerOptions: {
                strict: true,
            },
        },
         // customize tsconfig.shared.json
        sharedTsConfig: {
            compilerOptions: {
                strict: true,
            },
        },
        // Customize build-time TypeScript config
        nodeTsConfig: {
            compilerOptions: {
                strict: true,
            },
        },
    },

    nitro: {
        preset: 'static',
        typescript: {
            tsConfig: {
                compilerOptions: {
                    strict: true,
                }
            }
        }
    },

    future: {
        compatibilityVersion: 4,
    },

    compatibilityDate: '2025-12-13'
})
