import type { ServerInfo } from '@/types'

export const useMinecraftStatusStore = defineStore('minecraftServerStatus', () => {
    const { public: { minecrafServerHost } } = useRuntimeConfig()

    const { data, status, refresh } = useLazyFetch<ServerInfo>(`https://api.mcstatus.io/v2/status/java/${minecrafServerHost}`)

    onMounted(() => {
        setInterval(refresh, 60 * 1000)
    })

    const loading = computed(() => status.value != 'success')

    return { data, loading }
})
