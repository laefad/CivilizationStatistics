import type { Team } from "@/types"

export type Game = {
    id: number
    teams: Team[]
    turns: number
    end_reason: string
    start_date: string     // YYYY-MM-DD
    finish_date: string    // YYYY-MM-DD
    seconds_per_move: null | number
}
