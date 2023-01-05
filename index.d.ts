import type { Database } from 'firebase/database'

declare module '#app' {
    interface NuxtApp {
        $firebase: Database
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $firebase: Database
    }
}

export { }
