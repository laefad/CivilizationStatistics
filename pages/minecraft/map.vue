<script lang="ts" setup>

</script>

<template>
  <main class="column">
    <iframe id="map" src="http://z9.joinserver.xyz:25751"></iframe>
  </main>
</template>

<style lang="sass">
iframe
  min-width: 80vw
  height: 80vh

body:has(#map:hover) #pyramid
  visibility: hidden
</style>
