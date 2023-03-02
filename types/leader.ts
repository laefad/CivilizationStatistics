import type { GameInfo } from "@/types"

export type Leader = {
    id: number
    nation_id: number
    name: string

    is_banned: boolean
    is_played: boolean

    solo_wins_amount: number
    team_wins_amount: number
    total_wins_amount: number

    games_amount: number
    games_info: GameInfo[]
}
