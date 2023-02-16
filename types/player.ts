import type { GameInfo } from "@/types"

export type RatingChange = {
    game_id: number
    rating_change: number
}

export type Player = {
    name: string

    rating: number
    peak_rating: number

    top_position: number
    lowest_position: number
    average_rating: number

    games_amount: number
    solo_wins_amount: number
    team_wins_amount: number
    total_wins_amount: number
    win_rate: number

    change_position: number
    current_win_streak: number
    max_win_streak: number

    highest_rating_take: number
    highest_rating_take_game: number
    lowest_rating_take: number
    lowest_rating_take_game: number

    rating_changes: RatingChange[]
    games_info: GameInfo[]
}
