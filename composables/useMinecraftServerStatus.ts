import { ServerInfo } from 'types'

export const useMinecraftServerStatus = async () => {
    const { public: { minecrafServerHost } } = useRuntimeConfig()

    return useLazyFetch<ServerInfo>(`https://api.mcstatus.io/v2/status/java/${minecrafServerHost}`)
}
