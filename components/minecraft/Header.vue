<script lang="ts" setup>

import type { RoutePathSchema } from '@typed-router'

type Route = {
  path: RoutePathSchema
  name: string
}

const namedRoutes: Array<Route> = [
  { path: '/minecraft/about', name: 'О сервере' },
  { path: '/minecraft/map', name: 'Карта' }
]
</script>

<template>
  <header class="column">
    <NuxtLink :to="{name: 'index'}">
      <MinecraftLogo id="logo" />
    </NuxtLink>
    <nav class="row">
      <NuxtLink v-for="route in namedRoutes" :to="route.path" active-class="selected">
        {{ route.name }}
      </NuxtLink>
    </nav>
  </header>
</template>

<style lang="sass" scoped>
@use 'assets/variables/typography'

#logo
  margin-bottom: 1rem
  margin-top: 1rem

nav
  flex-wrap: wrap
  padding: 20px 0px 20px 0px

  > a
    padding: 5px 10px 5px 10px
    font-size: typography.$h6_font_size
    font-weight: 700
    font-family: Arial, sans-serif
    color: black
    text-decoration: underline

    &.selected
      color: white
      background: black
      text-decoration: none

</style>
