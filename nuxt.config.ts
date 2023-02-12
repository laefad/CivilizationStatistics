// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@kevinmarrec/nuxt-pwa',
        // 'nuxt-typed-router'
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
    css: ['~/assets/main.sass'],
    typescript: {
        strict: true
    }
})
