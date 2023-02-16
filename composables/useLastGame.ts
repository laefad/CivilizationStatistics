import type { Game } from '@/types'

export const useLastGame = () => useState('last_game', () => {
    const lastGameId = useFirebaseValueFromPath<number>('/table/meta/last_game', 0)
    const lastGame = useFirebaseValueFromPath<Game | null>(`/table/games/${lastGameId.value}`, null)
    return lastGame
})
