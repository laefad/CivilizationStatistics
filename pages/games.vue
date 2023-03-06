<template>
  <div class="column">
    <DataTable :data="gamesData" :columns="columns">
      <template #players-cell="{ cell, index }">
        <td :class="{win: cell.players[index].is_win}">
          {{ cell.players[index].name }}
        </td>
      </template>
      <template #dates-cell="{ cell, rowspan }">
        <td
          :rowspan="rowspan"
        >
          <p> {{ formatDate(cell.dates.start_date) }} </p>
          <p> - </p>
          <p> {{ formatDate(cell.dates.finish_date) }} </p>
        </td>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
// types
import { Column, SortOrder } from '@/components/DataTable.vue'
import type { Game, MetaPlayer, Player } from '@/types'

// util
const formatDate = (date: string) => {
  return new Date(date).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// data
const players = useFirebaseValueFromPath<Player[]>('/table/players/', [])
const leaders = useFirebaseValueFromPath<Player[]>('/table/leaders/', [])

const gamesData = computed(() =>
  useFirebaseValueFromPath<Game[]>('/table/games/', []).value.map(
    (game) => {
      const { game_number, teams, turns, end_reason, start_date, finish_date } = game
      const metaPlayers = teams.reduce((acc, t) => [...acc, ...t], [] as MetaPlayer[])

      const _players = metaPlayers
        .map(({ player_id }) => ({
          'name': players.value.at(player_id)?.name ?? 'Неизвестный',
          'is_win': teams.at(0)?.some(team_player => team_player.player_id == player_id) ?? false
        }))

      const _leaders = metaPlayers
        .map(({ leader_id }) => leaders.value.at(leader_id)?.name ?? 'Безымянный')

      return {
        game_number,
        players: _players,
        leaders: _leaders,
        turns: turns,
        dates: {
          start_date,
          finish_date
        },
        end_reason
      }
    }
  )
)

const columns: Array<Column> = [
  { name: 'game_number', alias: 'Номер игры', sortOrder: SortOrder.Descending },
  { name: 'players', alias: 'Игроки', sortable: false },
  { name: 'leaders', alias: 'Лидеры', sortable: false },
  { name: 'turns', alias: 'Ходов' },
  { name: 'end_reason', alias: 'Причина победы' },
  { name: 'dates', alias: 'Даты проведения игр', sortable: false },
]

</script>

<style lang="sass" scoped>
.win
  background-color: #98FB98

</style>
