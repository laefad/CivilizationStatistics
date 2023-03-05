<template>
  <div class="column">
    <h2>Топ 10 выбираемых наций</h2>
    <Bar :data="preparedData" :options="options"/>
    <h2>Тест боевки по партиям</h2>
    <Bar :data="battlePreparedData" :options="battleOptions"/>
  </div>
</template>

<script lang="ts" setup>
import type { ExportedGame, Nation } from '@/types'
import type { ChartData, ChartOptions } from 'chart.js'

import { Chart as ChartJS, BarElement, CategoryScale, Title, Legend, LinearScale, Tooltip } from 'chart.js'

import { Bar } from 'vue-chartjs'
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Legend, Tooltip)

// График побед/поражений у топ10 наций
const data = useFirebaseValueFromPath<Nation[]>('/table/nations/', [])

const preparedData = computed(() => {
  const amount = 10

  const _data = data.value
    .filter(nation => nation.games_info != undefined)
    .sort((nation_a, nation_b) => nation_b.games_info!.length - nation_a.games_info!.length)
    .splice(0, amount)

  return {
    labels: _data.map(nation => nation.name),
    datasets: [{
      label: 'Проиграно',
      backgroundColor: '#ff949e',
      data: _data.map(nation =>
        nation.games_info!.filter(game => !game.is_win).length
      )
    }, {
      label: 'Выиграно',
      backgroundColor: '#98FB98',
      data: _data.map(nation =>
        nation.games_info!.filter(game => game.is_win).length
      )
    }]
  } as ChartData<'bar', number[], string>
})

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    title: {
      display: false,
      text: 'Тестовый график'
    }
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  },
  animation: false
}

// График количества битв за игру
const battleData = useFirebaseValueFromPath<{[k: string]: ExportedGame}>('/statsForEvents/', {})

const battlePreparedData = computed(() => {
  const _data = Object.values(battleData.value)
    .sort((game_a, game_b) => game_b.events.MOMENT_BATTLE_FOUGHT - game_a.events.MOMENT_BATTLE_FOUGHT)

  return {
    labels: _data.map(game => `Партия ${game.game_number}`),
    datasets: [{
      label: 'Количество битв:',
      backgroundColor: '#ff949e',
      data: _data.map(game =>
        game.events.MOMENT_BATTLE_FOUGHT
      )
    }]
  } as ChartData<'bar', number[], string>

})

const battleOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    title: {
      display: false,
      text: 'Тестовый график'
    }
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  },
  animation: false
}
</script>
