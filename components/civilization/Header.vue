<script lang="ts" setup>

import type { RoutesNamedLocations } from '@typed-router'

type Route = {
  route: RoutesNamedLocations
  name: string
}

const namedRoutes: Array<Route> = [
  { route: { name: 'civilization-rating' }, name: 'Рейтинг' },
  { route: { name: 'civilization-details' }, name: 'Подробный рейтинг' },
  { route: { name: 'civilization-games' }, name: 'Игры' },
  { route: { name: 'civilization-charts' }, name: 'Графики' },
  { route: { name: 'civilization-other' }, name: 'Чулан' },
]
</script>

<template>
  <header class="column">
    <NuxtLink :to="{name: 'index'}">
      <img
        id="logo"
        src="/icons/logo.svg"
        alt="CIVILIZATION CLUB"
      />
    </NuxtLink>
    <nav class="row">
      <NuxtLink v-for="route in namedRoutes" :to="route.route" active-class="selected">
        {{ route.name }}
      </NuxtLink>
    </nav>
  </header>
</template>

<style lang="sass" scoped>
@import 'assets/variables/typography'

#logo
  margin-bottom: 1rem
  margin-top: 1rem

nav
  flex-wrap: wrap
  padding: 20px 0px 20px 0px

  > a
    padding: 5px 10px 5px 10px
    font-size: $h6_font_size
    font-weight: 700
    font-family: Arial, sans-serif
    color: black
    text-decoration: underline

    &.selected
      color: white
      background: black
      text-decoration: none

</style>
