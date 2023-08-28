import { ServerInfo } from 'types'

export const useMinecraftStatusStore = defineStore('minecraftServerStatus', () => {
    const { public: { minecrafServerHost } } = useRuntimeConfig()

    const { data, pending, refresh } = useLazyFetch<ServerInfo>(`https://api.mcstatus.io/v2/status/java/${minecrafServerHost}`)

    onMounted(() => {
        setInterval(refresh, 60 * 1000)
    })

    return { data, pending }
})
