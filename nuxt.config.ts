const baseURL = process.env.NUXT_APP_BASE_URL;

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
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: `${baseURL}/icon.png`
                }
            ]
        },
        baseURL
    },

    css: ['~/assets/main.sass'],

    runtimeConfig: {
        public: {
            minecraftServerHost: process.env.MINECRAFT_SERVER_HOST,
            minecraftMapHost: process.env.MINECRAFT_MAP_HOST
        }
    },

    typescript: {
        tsConfig: {
            compilerOptions: {
                strict: true,
            },
        },
        sharedTsConfig: {
            compilerOptions: {
                strict: true,
            },
        },
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

    compatibilityDate: '2026-10-17'
})
