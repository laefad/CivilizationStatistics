import type {ExportedLeader} from "@/types"

export type ExportedGame = {
    game_number: number // Game number
    // TODO Этого поля тут нет
    leaders: Array<ExportedLeader[]> // Leaders with moments
    events: {[name: string]: number} // List of all moments
}
