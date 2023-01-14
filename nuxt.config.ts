// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@kevinmarrec/nuxt-pwa'
    ],
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
    css: ['~/assets/_basic.sass', '~/assets/_flex.sass'],
    typescript: {
        strict: true
    }
})
