<template>
  <div class="column">
    <h2>
      Таблица рейтинга игроков
    </h2>
    <p>
      Ссылка на гугл диск:
      <a class="headerLink" href="https://drive.google.com/drive/folders/1HM5ChFtyVpgP5ZosXqBtJthiLBkHPlAi">
        FAQ Team
      </a>
    </p>
    <DataTable :data="data" :columns="columns"/>
  </div>
</template>

<script lang="ts" setup>

const data = computed(() => useFirebaseValueFromPath<any>('/table/players/').value ?? []);
const columns = [
  {name: 'name', alias: 'Игрок'},
  {name: 'rating', alias: 'Рейтинг'}
]

</script>

<style lang="sass" scoped>
.headerLink
  font-size: 111%
</style>
