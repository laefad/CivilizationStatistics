<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            @click="onSortOrderChange(column)"
            class="sortable"
          >
            {{ column.alias ?? column.name }}
            <span>
              {{ column.sortOrder == SortOrder.Ascending ? "▲" : "▼" }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in sortedData">
          <td v-for="column in columns">
            <slot :name="`${column.name}-cell`" :cell="entry">
              {{ entry[column.name] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">

export enum SortOrder {
  Ascending,
  Descending,
  Default = Ascending
}

export type Column = {
  name: string
  alias?: string
  sortOrder?: SortOrder
  sortPriority?: number
}

</script>

<script
  lang="ts"
  setup
  generic="T extends { [key: string]: number | string }"
>
import type { Ref } from 'vue'

const props = defineProps<{
  columns: Array<Column>
  data: T[] | null
}>()

// Инициализация с начальными значениями
// А вот как дела с реактивностью с точки зрения компонента я хз
let priority = props.columns.length
const columns: Ref<Array<Required<Column>>> = ref(
  [...props.columns].map(column => {
    column.sortOrder = column.sortOrder ?? SortOrder.Default
    column.sortPriority = column.sortPriority ?? (column.sortOrder ? priority-- : 0)
    return column as Required<Column>
  })
)

const data = computed(() => props.data ?? [])

const onSortOrderChange = (column: Required<Column>) => {
  if (column.sortOrder == SortOrder.Ascending)
    column.sortOrder = SortOrder.Descending
  else
    column.sortOrder = SortOrder.Ascending

  columns.value.forEach(column => {
    if (column.sortPriority > 0)
      column.sortPriority--
  })

  column.sortPriority = columns.value.length
}

const sortedData = computed(() => {

  const compareNumbers = (a: number, b: number, sortOrder: SortOrder) =>
    (sortOrder == SortOrder.Ascending ? 1 : -1) * (a - b)

  const compareStrings = (a: string, b: string, sortOrder: SortOrder) =>
    (sortOrder == SortOrder.Ascending ? 1 : -1) * a.localeCompare(b)

  const compareColumns = ({ sortPriority: a = 0 }: Required<Column>, { sortPriority: b = 0 }: Required<Column>) => a - b

  return [...columns.value]
    .sort(compareColumns)
    // Сортируются данные с учетом типа сортировки
    .reduce(
      (acc, { name, sortOrder }) =>
        acc.sort(
          (a, b) => {
            const a_value = a[name]
            const b_value = b[name]

            if (typeof a_value == 'string' && typeof b_value == 'string')
              return compareStrings(a_value, b_value, sortOrder ?? SortOrder.Default)

            if (typeof a_value == 'number' && typeof b_value == 'number')
              return compareNumbers(a_value, b_value, sortOrder ?? SortOrder.Default)

            // Не бросаем ошибку, просто игнорируем
            return 0
          }
        ),
      data.value
    )
})

</script>

<style lang="sass" scoped>
.container
  max-width: 100vw
  overflow-x: auto

.sortable
  cursor: pointer

table
  border-collapse: collapse
  font-size: 18px

th, td
  padding: 10px 5px 10px 5px
  min-width: min(20vw, 175px)
  text-align: center

  &:not(:last-child)
    border-right: 1px black solid

td
  border-top: 1px black solid

</style>
