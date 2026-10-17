import type { ServerInfo } from '@/types'

export const useMinecraftStatusStore = defineStore('minecraftServerStatus', () => {
    const { public: { minecraftServerHost } } = useRuntimeConfig()

    const { data, status, refresh } = useLazyFetch<ServerInfo>(`https://api.mcstatus.io/v2/status/java/${minecraftServerHost}`)

    onMounted(() => {
        setInterval(refresh, 60 * 1000)
    })

    const loading = computed(() => status.value != 'success')

    return { data, loading }
})
