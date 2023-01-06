<template>
  <div class="column">
    <h2>
      Детальный рейтинг игроков
    </h2>
    <DataTable :data="data" :columns="columns"/>
  </div>
</template>

<script lang="ts" setup>

const data = computed(() => useFirebaseValueFromPath<any>('/table/players/').value ?? []);
const columns = [
  {name: 'name', alias: 'Игрок'},
  {name: 'rating', alias: 'Рейтинг'},
  {name: 'count', alias: 'Игры'},
  {name: 'total_wins', alias: 'Победы'},
  {name: 'personal_wins', alias: 'Одиночные'},
  {name: 'team_wins', alias: 'Командные'},
  {name: 'win_rate', alias: 'Процент побед'},
]

</script>
