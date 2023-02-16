<template>
  <div class="column">
    <DataTable :data="gamesData" :columns="columns">
      <template #players-cell="{ cell }">
        <table class="players-cell">
          <tr v-for="player in cell.players">
            <td :class="{ win: player.is_win }">
              {{ player.name }}
            </td>
          </tr>
        </table>
      </template>
      <template #leaders-cell="{ cell }">
        <table class="leaders-cell">
          <tr v-for="leader in cell.leaders">
            <td>
              {{ leader.name }}
            </td>
          </tr>
        </table>
      </template>
      <template #dates-cell="{ cell }">
        <p>
          {{ formatDate(cell.dates.start_date) }}
        </p>
        <p>
          -
        </p>
        <p>
          {{ formatDate(cell.dates.finish_date) }}
        </p>
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
      const { id, teams, turns, end_reason, start_date, finish_date } = game
      const metaPlayers = teams.reduce((acc, t) => [...acc, ...t], [] as MetaPlayer[])

      const _players = metaPlayers
        .map(({ player_id }) => ({
          'name': players.value.at(player_id)?.name,
          'is_win': teams.at(0)?.find(team_player => team_player.player_id == player_id)
        }))

      const _leaders = metaPlayers
        .map(({ leader_id }) => ({
          'name': leaders.value.at(leader_id)?.name,
        }))

      return {
        id,
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
  { name: 'id', alias: 'Номер игры', sortOrder: SortOrder.Descending },
  { name: 'players', alias: 'Игроки', sortable: false },
  { name: 'leaders', alias: 'Лидеры', sortable: false },
  { name: 'turns', alias: 'Ходов' },
  { name: 'end_reason', alias: 'Причина победы' },
  { name: 'dates', alias: 'Даты проведения игр', sortable: false },
]

</script>

<style lang="sass">

.players-cell, .leaders-cell

  td:has(&)
    padding: 0px

  border-collapse: collapse
  border-spacing: 0px

  &, tr, td
    width: 100%,

  th, td
    padding: 10px 5px 10px 5px
    min-width: min(20vw, 175px)
    text-align: center

  tr:not(:first-child)
    td
      border-top: 1px black solid

.players-cell
  * > td.win
    background-color: #98FB98

</style>
