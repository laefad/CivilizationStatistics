import type { GameInfo } from "@/types"

export type Nation = {
    id: number
    name: string
    games_info?: GameInfo[]
}
