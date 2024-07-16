import { ref } from 'vue'

export interface Column {
  prop: string
  type: string
}

export function useStore<T>() {
  const columns = ref<Column[]>([])

  function insertColumn(column: Column) {
    columns.value.push(column)
  }

  return {
    columns,
    insertColumn
  }
}
