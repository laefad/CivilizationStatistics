import type { Game } from '@/types'

export const useLastGame = () => computed(() => {
    const lastGameId = useFirebaseValueFromPath<number>('/table/meta/last_game', 0)
    const lastGame = useFirebaseValueFromPath<Game | null>(`/table/games/${lastGameId.value}`, null)
    return lastGame.value
})
