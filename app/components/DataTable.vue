<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :class="{
              narrow: column.narrow
            }"
          >
            <button
              class="table-header-cell"
              v-if="column.sortable"
              @click="onSortOrderChange(column)"
            >
              {{ column.alias ?? column.name }}
              <span>
                {{ column.sortOrder == SortOrder.Ascending ? "▲" : "▼" }}
              </span>
            </button>
            <div v-else>
              {{ column.alias ?? column.name }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="{value, rowspan} in preparedData"
        >
          <!-- Non array rows -->
          <tr>
            <slot
              v-for="column in columns"
              :name="`${column.name}-cell`"
              :cell="value"
              :rowspan="Array.isArray(value[column.name]) ? 1 : rowspan"
              :index="0"
            >
              <td
                :rowspan="Array.isArray(value[column.name]) ? 1 : rowspan"
                :class="{
                  narrow: column.narrow
                }"
              >
                {{ Array.isArray(value[column.name])
                  ? (value[column.name] as Array<T>)[0]
                  : value[column.name]
                }}
              </td>
            </slot>
          </tr>

          <!-- Array rows -->
          <tr
            v-if="rowspan > 1"
            v-for="i in (rowspan - 1)"
          >
            <template
              v-for="column in columns"
            >
              <slot
                v-if="Array.isArray(value[column.name])"
                :name="`${column.name}-cell`"
                :cell="value"
                :rowspan="Array.isArray(value[column.name]) ? 1 : rowspan"
                :index="i"
              >
                <td
                  :rowspan="Array.isArray(value[column.name]) ? 1 : rowspan"
                  :class="{
                    narrow: column.narrow
                  }"
                >
                  {{ (value[column.name] as Array<T>)[i] }}
                </td>
              </slot>
            </template>
          </tr>

        </template>
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
  sortable?: boolean
  narrow?: boolean
}

</script>

<script
  lang="ts"
  setup
  generic="T extends {
    [key: string]: Array<T> | string | number
  }"
>
import type { Ref } from 'vue'

const props = defineProps<{
  columns: Array<Column>
  data: T[] | null
}>()

// Инициализация с начальными значениями
let priority = props.columns.length
const columns: Ref<Array<Required<Column>>> = ref(
  [...props.columns].map(column => {
    column.sortOrder = column.sortOrder ?? SortOrder.Default
    column.sortPriority = column.sortPriority ?? (column.sortOrder ? priority-- : 0)
    column.sortable = column.sortable ?? true
    column.narrow = column.narrow ?? false
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

const preparedData = computed(() => {

  const compareNumbers = (a: number, b: number, sortOrder: SortOrder) =>
    (sortOrder == SortOrder.Ascending ? 1 : -1) * (a - b)

  const compareStrings = (a: string, b: string, sortOrder: SortOrder) =>
    (sortOrder == SortOrder.Ascending ? 1 : -1) * a.localeCompare(b)

  const compareColumns = ({ sortPriority: a = 0 }: Required<Column>, { sortPriority: b = 0 }: Required<Column>) => a - b

  const sortedData = [...columns.value]
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

    return sortedData.map((entry) => {
      const rowspan = columns.value.reduce(
        (acc, column) => {
          if (Array.isArray(entry[column.name]))
            return Math.max((entry[column.name] as Array<{}>).length, acc)
          return acc
        },
        1
      )

      return {
        value: entry,
        rowspan
      }
    })
})
</script>

<style lang="sass" scoped>
@use 'assets/variables/table'

.container
  max-width: 100vw
  overflow-x: auto

.table-header-cell
  height: 100%
  width: 100%
  padding: table.$cell-vertical-padding table.$cell-horizontal-padding
  background: none
  color: inherit
  border: none
  font: inherit
  cursor: pointer
  outline: inherit

th
  &:has( > .table-header-cell)
    padding: 0px

</style>
