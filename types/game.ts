import type { Team } from "@/types"

export type Game = {
    id: number
    teams: Team[]
    turns: number
    end_reason: string
}
