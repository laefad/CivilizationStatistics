<template>
  <footer class="row">
    <p v-if="lastGame"> Последняя игра: {{ formatGameDate(lastGame) }}</p>
  </footer>
</template>

<script lang="ts" setup>
// types
import type { Game } from '@/types'

// util
const formatGameDate = (game: Game) => {
  return new Date(game.finish_date).toLocaleString('ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// data
const lastGame = useLastGame()

</script>

<style lang="sass" scoped>
footer
  width: 100vw
  margin-bottom: 1rem
  margin-top: 1rem

  justify-content: space-around

</style>
