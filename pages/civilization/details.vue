<template>
  <main class="column">
    <DataTable :data="data" :columns="columns">
      <template #name-cell="{cell: {id, name}}">
        <td>
          <NuxtLink :to="{name: 'civilization-player-id', params: {id}}" >{{ name }}</NuxtLink>
        </td>
      </template>
    </DataTable>
  </main>
</template>

<script lang="ts" setup>
// types
import type { Column } from '@/components/DataTable.vue'
import type { Player } from '@/types';

type PlayerData = Omit<Player, 'rating_changes' | 'games_info'>

const data = useFirebaseValueFromPath<PlayerData[]>('/table/players/', [])

const columns: Array<Column> = [
  { name: 'name', alias: 'Игрок' },
  { name: 'rating', alias: 'Рейтинг' },
  { name: 'games_amount', alias: 'Игры' },
  { name: 'total_wins_amount', alias: 'Победы' },
  { name: 'solo_wins_amount', alias: 'Одиночные' },
  { name: 'team_wins_amount', alias: 'Командные' },
  { name: 'win_rate', alias: 'Процент побед' },
]

</script>
