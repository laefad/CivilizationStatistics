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
  { path: '/meme', name: 'Мем' },
]
</script>

<style lang="sass" scoped>
nav
  padding: 20px 0px 20px 0px

  > a
    padding: 5px 10px 5px 10px
    font-size: 24px
    font-weight: 700
    font-family: Arial, sans-serif
    text-decoration: underline

    &.selected
      color: white
      background: black
      text-decoration: none
</style>
