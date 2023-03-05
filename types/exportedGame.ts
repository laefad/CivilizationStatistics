import type {ExportedLeader} from "@/types"

export type ExportedGame = {
    game_number: number // Game number
    leaders: Array<ExportedLeader> // Leaders
    events: {[name: string]: number} // List of all moments
}
