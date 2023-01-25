import type { GameInfo } from "@/types"

export type Leader = {
    name: string

    /** @deprecated */
    nationName: string
    nation_id: number

    games_info: GameInfo[]
}
