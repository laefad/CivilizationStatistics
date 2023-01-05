// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            title: 'Civ V club',
            // meta: [],
            link: [
                { rel: 'icon', href: "/images/favicon.png", type: "image/png" }
            ]
        }
    },
    css: ['~/assets/_basic.sass', '~/assets/_flex.sass'],
    typescript: {
        strict: true
    }
})
