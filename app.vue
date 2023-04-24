<script lang="ts" setup>
const isDesktop = ref(false)
onMounted(() => {
  isDesktop.value = !isMobile()
})
</script>

<template>
  <!-- TODO create header -->
  <header class="column">
    <AppNavigation></AppNavigation>
  </header>
  <NuxtPage></NuxtPage>
  <AppFooter></AppFooter>
  <Pyramid v-if="isDesktop"></Pyramid>
</template>

<style lang="sass">

</style>
