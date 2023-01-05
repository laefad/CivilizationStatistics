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
const columns = ['name', 'rating', 'count', 'total_wins', 'personal_wins', 'team_wins', 'win_rate']

</script>
