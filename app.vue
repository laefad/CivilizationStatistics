<script lang="ts" setup>
const isDesktop = ref(false)

onMounted(() => {
  isDesktop.value = !isMobile()
})
</script>

<template>
  <NuxtPage />
  <Pyramid
    v-if="isDesktop"
  />
</template>

<style lang="sass">

</style>
