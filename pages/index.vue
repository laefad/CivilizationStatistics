<template>
  <div class="column" id="links-list">
    <NuxtLink :to="{name: 'civilization-rating'}">
      <img
        src="/icons/logo.svg"
        alt="CIVILIZATION CLUB"
      />
    </NuxtLink>
    <h3>-----</h3>
    <NuxtLink :to="{name: 'minecraft-about'}">
      <MinecraftLogo/>
    </NuxtLink>
  </div>
</template>

<style lang="sass" scoped>
#links-list
  min-height: 100vh
  gap: 2rem
</style>
