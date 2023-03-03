<template>
  <div class="column">
    <h1>Топ 10 выбираемых наций</h1>
    <Bar :data="preparedData" :options="options"/>
  </div>
</template>

<script lang="ts" setup>
import type { Nation } from '@/types'
import type { ChartData, ChartOptions } from 'chart.js'

import { Chart as ChartJS, BarElement, CategoryScale, Title, Legend, LinearScale, Tooltip } from 'chart.js'

import { Bar } from 'vue-chartjs'
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Legend, Tooltip)

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
      display: true,
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
