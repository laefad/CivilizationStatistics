<script lang="ts" setup>

const { data, pending } = storeToRefs(useMinecraftStatusStore())

</script>

<template>
  <main class="column">
    <a
      href="https://docs.google.com/spreadsheets/d/1WG63YU5QyCur_WiqltFNI3Tt7Og4TipJeO7KzdnY6J4"
    >Таблица со списком модов и плагинов</a>

    <p v-if="pending"> Загрузка... </p>
    <template v-else>
      <div class="column">
        <p> {{ data?.host }} : {{ data?.online ? 'Онлайн' : 'Сервер недоступен'}} </p>
        <p> {{ data?.motd?.clean }} </p>
        <p> Версия: {{ data?.version?.name_clean }} </p>
      </div>

      <div class="column" v-if="data?.players?.online ?? 0 > 0">
        <p>Игроки на сервере: </p>
        <ol>
          <li v-for="player in data?.players.list">
            {{ player.name_clean }}
          </li>
        </ol>
      </div>
      <p v-else>Игроков нет на сервере</p>

      <p>Информация обновляется каждую минуту.</p>
    </template>
  </main>
</template>

<style lang="sass" scoped>
main
  gap: 2rem
</style>
