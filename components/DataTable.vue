<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" @click="onSortOrderChange(column)">
            {{ column.alias ?? column.name }}
            <span>
              {{ sortOrder[column.name]?.ascending ? "▲" : "▼" }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in sortedData">
          <td v-for="column in columns">
            {{ entry[column.name] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>

type Column = {
  name: string,
  alias?: string,
}

type Props = {
  columns: Array<Column>,
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
const onSortOrderChange = (column: Column) => {

  if (column.name in sortOrder) {
    sortOrder[column.name].ascending = !sortOrder[column.name].ascending
    // Устанавливаем максимальный приоритет
    sortOrder[column.name].priority = props.columns.length
  } else {
    sortOrder[column.name] = {
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
      const aa = sortOrder[a.name]?.priority ?? 0
      const bb = sortOrder[b.name]?.priority ?? 0
      return aa - bb
    }
  ).reduce(
    // Я возможно перепутал прямой и обратный порядок сортировки, надо проверить
    (acc, column) =>
      acc.sort(
        (a, b) => {
          // Это прямо таки фирменный пиздец
          const order = sortOrder[column.name]?.ascending != null ? sortOrder[column.name].ascending : DEFAULT_SORT_ORDER
          if (a[column.name] == b[column.name])
            return 0
          if (a[column.name] > b[column.name])
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

th, td
  padding: 10px 0px 10px 0px
  min-width: min(20vw, 175px)
  text-align: center

  &:not(:last-child)
    border-right: 1px black solid

td
  border-top: 1px black solid

</style>
