<script lang="ts" setup>
const { public: { minecraftMapHost } } = useRuntimeConfig()
</script>

<template>
  <main class="column">
    <iframe
      id="map"
      :src="minecraftMapHost"
      title="Карта сервера"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </main>
</template>

<style lang="sass">
iframe
  min-width: 80vw
  height: 80vh

body:has(#map:hover) #pyramid
  visibility: hidden
</style>
