<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th v-for="key in columns" @click="onSortOrderChange(key)">
            {{ key }}
            <span>
              {{ sortOrder[key]?.ascending ? "▲" : "▼" }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in sortedData">
          <td v-for="key in columns">
            {{ entry[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>

type Props = {
  columns: Array<string>,
  sortOrder?: {
    [key: string]: {
      priority: number,
      ascending: boolean,
    }
  } | null,
  data: Array<{ [key: string]: number | string }> | null
}

// От наибольшего к наименьшему
const DEFAULT_SORT_ORDER = false

const props = withDefaults(
  defineProps<Props>(),
  {
    sortOrder: null,
    data: null
  }
)

const sortOrder = reactive(unref(props.sortOrder) ?? {})
const onSortOrderChange = (column: string) => {

  if (column in sortOrder) {
    sortOrder[column].ascending = !sortOrder[column].ascending
    // Устанавливаем максимальный приоритет
    sortOrder[column].priority = props.columns.length
  } else {
    sortOrder[column] = {
      ascending: !DEFAULT_SORT_ORDER,
      // Устанавливаем максимальный приоритет
      priority: props.columns.length
    }
  }

  // Уменьшаем приоритет остальных параметров (сломается при переполнении, но и хуй с ним)
  for (const key in sortOrder) {
    sortOrder[key].priority--
  }

}

const sortedData = computed(() => {
  return [...props.columns].sort(
    (a, b) => {
      const aa = sortOrder[a]?.priority ?? 0
      const bb = sortOrder[b]?.priority ?? 0
      return aa - bb
    }
  ).reduce(
    // Я возможно перепутал прямой и обратный порядок сортировки, надо проверить
    (acc, column) =>
      acc.sort(
        (a, b) => {
          // Это прямо таки фирменный пиздец
          const order = sortOrder[column]?.ascending != null ? sortOrder[column].ascending : DEFAULT_SORT_ORDER
          if (a[column] == b[column])
            return 0
          if (a[column] > b[column])
            return order ? 1 : -1
          else
            return order ? -1 : 1
        }
      ),
    props.data ?? []
  )
})

</script>

<style lang="sass" scoped>
.container
  max-width: 100vw

table
  border-collapse: collapse
  font-size: 18px

td
  padding: 10px 0px 10px 0px
  min-width: min(20vw, 175px)
  text-align: center
  border-top: 1px black solid

  &:not(:last-child)
    border-right: 1px black solid

th
  padding: 10px 0px 10px 0px
  min-width: min(20vw, 175px)
  text-align: center

  &:not(:last-child)
    border-right: 1px black solid
</style>
