<script lang="ts" setup>
// types
import type { Column } from '@/components/DataTable.vue'
import { SortOrder } from '@/components/DataTable.vue'
import type { Player } from '~/types'

// util
const formatNumber = (num: number) => `(${num > 0 ? '+' : ''}${num})`

// data
const lastGame = useLastGame()

const playersData = computed(() =>
  useFirebaseValueFromPath<Player[]>('/table/players/', []).value.sort((a, b) => {
    return b.rating - a.rating
  }).map(
    (player, position) => {
      const rating_change = player.rating_changes?.filter(
        rating_change => rating_change.game_id == (lastGame.value?.id ?? -1)
      ).at(0)?.rating_change ?? 0

      return {
        'id': player.id,
        'position': position,
        'position_change': player.change_position,
        'name': player.name,
        'rating': player.rating,
        rating_change
      }
    }
  )
)

const columns: Array<Column> = [
  { name: 'position', alias: '№', narrow: true},
  { name: 'name', alias: 'Игрок' },
  { name: 'rating', alias: 'Рейтинг', sortOrder: SortOrder.Descending }
]

</script>

<template>
  <main class="column">
    <DataTable :data="playersData" :columns="columns">
      <template #position-cell="{cell: {position, position_change}}">
        <td class="narrow">
          {{ position + 1 }}
          <span v-if="position_change != 0" :class="position_change > 0 ? 'text-green' : 'text-red'">
            {{ `(${position_change})` }}
          </span>
        </td>
      </template>
      <template #name-cell="{cell: {id, name}}">
        <td>
          <NuxtLink :to="{name: 'civilization-player-id', params: {id}}">{{ name }}</NuxtLink>
        </td>
      </template>
      <template #rating-cell="{cell: {rating, rating_change}}">
        <td>
          {{ rating }}
          <span v-if="rating_change != 0" :class="rating_change > 0 ? 'text-green' : 'text-red'">
            {{ formatNumber(rating_change) }}
          </span>
        </td>
      </template>
    </DataTable>
  </main>
</template>

<style lang="sass" scoped>
.text-green
  color: green
.text-red
  color: red
.headerLink
  font-size: 111%
</style>
