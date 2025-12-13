<script lang="ts" setup>
const isDesktop = ref(false)

onMounted(() => {
  isDesktop.value = !isMobile()
})
</script>

<template>
  <NuxtPwaManifest />
  <NuxtPage />
  <Pyramid
    v-if="isDesktop"
  />
</template>

<style lang="sass">

</style>
