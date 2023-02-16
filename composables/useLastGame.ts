import type { Game } from '@/types'

export const useLastGame = () => useState('last_game', () => {
    const lastGameId = useFirebaseValueFromPath<number>('/table/meta/last_game')
    const lastGame = useFirebaseValueFromPath<Game>(`/table/games/${lastGameId.value ?? 0}`)
    return lastGame
})
