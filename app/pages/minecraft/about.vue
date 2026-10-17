<script lang="ts" setup>

const { data, loading } = storeToRefs(useMinecraftStatusStore())

</script>

<template>
  <main class="column">

    <ul>
      <li>
        <a
          href="https://docs.google.com/spreadsheets/d/1WG63YU5QyCur_WiqltFNI3Tt7Og4TipJeO7KzdnY6J4"
        >Таблица со списком модов и плагинов</a>
      </li>

      <li>
      <a
        href="https://github.com/L3odr0id/minecraft-server-config/"
      >Репозиторий с конфигом сервера</a>
      </li>
    </ul>

    <p v-if="loading"> Загрузка... </p>
    <template v-else>
      <div class="column">
        <p> {{ data?.host }} : {{ data?.online ? 'Онлайн' : 'Сервер недоступен'}} </p>
        <p v-if="data?.motd?.clean"> {{ data?.motd?.clean }} </p>
        <p v-if="data?.version"> Версия: {{ data?.version?.name_clean }} </p>
      </div>

      <div class="column" v-if="data?.players?.online ?? 0 > 0">
        <p>Игроки на сервере: </p>
        <ol>
          <li v-for="player in data?.players.list">
            {{ player.name_clean }}
          </li>
        </ol>
      </div>
      <p v-else-if="data?.players">Игроков нет на сервере</p>
    </template>
    <p>Информация обновляется каждую минуту.</p>
  </main>
</template>

<style lang="sass" scoped>
main
  gap: 2rem
</style>
