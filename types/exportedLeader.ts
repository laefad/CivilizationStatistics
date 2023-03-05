import type { Moment } from "@/types"

export type ExportedLeader = {
    leader: String // Leader name
    events: Event[] // List of all moments for this player
    name: String // Civilization name
}
