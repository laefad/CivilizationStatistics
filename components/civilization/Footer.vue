<script lang="ts" setup>
import type { Game } from '@/types'

const formatGameDate = (game: Game) => {
  return new Date(game.finish_date).toLocaleString('ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const lastGame = useLastGame()
</script>

<template>
  <footer class="row">
    <p v-if="lastGame"> Последняя игра: {{ formatGameDate(lastGame) }}</p>
  </footer>
</template>

<style lang="sass" scoped>
footer
  width: 100vw
  margin-bottom: 1rem
  margin-top: 1rem

  justify-content: space-around
</style>
