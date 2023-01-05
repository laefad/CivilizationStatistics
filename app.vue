<template>
  <div class="column">
    <h1>
      Добро пожаловать на официальный сайт <b>Civ VI Club</b>
    </h1>
    <nav id="main-navigation">
      <NuxtLink to="/">Рейтинг</NuxtLink>
      <NuxtLink to="/details">Подробный рейтинг</NuxtLink>
      <NuxtLink to="/meme">Мем</NuxtLink>
    </nav>
    <NuxtPage></NuxtPage>
  </div>
</template>

<style lang="sass">
#main-navigation
  display: flex
  justify-content: center
  padding: 20px 0px 20px 0px

  > a
    padding: 5px 10px 5px 10px
    font-size: 24px
    font-weight: 700
    font-family: Arial, sans-serif
    text-decoration: underline
</style>
