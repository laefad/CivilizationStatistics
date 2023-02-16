import type { MetaPlayer } from "@/types"

export type Game = {
    id: number
    teams: Array<MetaPlayer[]>
    turns: number
    end_reason: string
    start_date: string     // YYYY-MM-DD
    finish_date: string    // YYYY-MM-DD
    seconds_per_move: null | number
}
