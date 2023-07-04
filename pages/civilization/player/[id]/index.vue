<template>
  <main>
    <p v-if="!player"> Загрузка... </p>
    <template v-else>
      <h1>Профиль игрока {{ player.name }}</h1>
      <div class="row">
        <table>
          <thead>
            <tr>
              <th colspan="2">Основные параметры</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Рейтинг</td>
              <td>{{ player.rating }}</td>
            </tr>
            <tr>
              <td>Количество игр</td>
              <td>{{ player.games_amount }}</td>
            </tr>
            <tr>
              <td>Побед/Поражений</td>
              <td>{{ `${player.total_wins_amount} / ${player.games_amount - player.total_wins_amount}` }}</td>
            </tr>
            <tr>
              <td>Процент побед</td>
              <td>{{ (player.win_rate * 100).toLocaleString(undefined, {minimumFractionDigits: 2}) + '%' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </main>
</template>

<script lang="ts" setup>
// types
import type { Player } from '@/types';

const { params: { id: playerId } } = useRoute('player-id');

const player = useFirebaseValueFromPath<Player | null>(`/table/players/${playerId}`, null)

</script>
