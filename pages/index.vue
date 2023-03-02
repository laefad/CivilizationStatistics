<template>
  <div class="column">
    <h1>
      Добро пожаловать на официальный сайт <b>Civ VI Club</b>
    </h1>
    <h2>
      Таблица рейтинга игроков
    </h2>
    <p>
      Ссылка на гугл диск:
      <a class="headerLink" href="https://drive.google.com/drive/folders/1HM5ChFtyVpgP5ZosXqBtJthiLBkHPlAi">
        FAQ Team
      </a>
    </p>
    <DataTable :data="playersData" :columns="columns">
      <template #rating-cell="{ cell }">
        <td>
          {{ cell.rating }}
          <span v-if="cell.change != 0" :class="cell.change > 0 ? 'text-green' : 'text-red'">
            {{ formatNumber(cell.change) }}
          </span>
        </td>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
// types
import { Column, SortOrder } from '@/components/DataTable.vue'
import type { Player } from '@/types'

// util
const formatNumber = (num: number) => `(${num > 0 ? '+' : ''}${num})`

// data
const lastGame = useLastGame()

const playersData = computed(() =>
  useFirebaseValueFromPath<Player[]>('/table/players/', []).value.map(
    (player) => {
      const change = player.rating_changes?.filter(
        rating_change => rating_change.game_id == (lastGame.value?.id ?? -1)
      ).at(0)?.rating_change ?? 0

      return {
        'name': player.name,
        'rating': player.rating,
        change
      }
    }
  )
)

const columns: Array<Column> = [
  { name: 'name', alias: 'Игрок' },
  { name: 'rating', alias: 'Рейтинг', sortOrder: SortOrder.Descending }
]

</script>

<style lang="sass" scoped>
.text-green
  color: green
.text-red
  color: red
.headerLink
  font-size: 111%
</style>
