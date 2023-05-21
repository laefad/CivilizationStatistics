<template>
  <nav class="row">
    <NuxtLink v-for="route in routes" :to="route.path" active-class="selected">
      {{ route.name }}
    </NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
const routes = [
  { path: '/', name: 'Рейтинг' },
  { path: '/details', name: 'Подробный рейтинг' },
  { path: '/games', name: 'Игры' },
  { path: '/charts', name: 'Графики' },
  { path: '/other', name: 'Чулан' },
]
</script>

<style lang="sass" scoped>
@import 'assets/variables/typography'

nav
  flex-wrap: wrap
  padding: 20px 0px 20px 0px

  > a
    padding: 5px 10px 5px 10px
    font-size: $h6_font_size
    font-weight: 700
    font-family: Arial, sans-serif
    text-decoration: underline

    &.selected
      color: white
      background: black
      text-decoration: none
</style>
