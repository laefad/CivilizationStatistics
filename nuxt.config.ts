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
