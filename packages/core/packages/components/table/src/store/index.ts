import { stringToNumber } from '@kirkw/utils'
import { computed, getCurrentInstance, onMounted, ref, type Ref } from 'vue'

export interface Column {
  prop: string
  type: string
  label: string
  width: number | string | undefined
  realWidth?: number
  minWidth?: string | number
}

export function useStore<T>() {
  const columns = ref<Column[]>([])
  const instance = getCurrentInstance()

  function insertColumn(column: Column) {
    columns.value.push(column)
  }
  function updateColumns(columns: Ref<Column[]>) {
    columns.value = columns.value.map((column) => {
      column.realWidth = getRealWidth(columns.value, column)
      return column
    })
  }

  function getRealWidth(columns: Column[], column: Column): number {
    if (column.width) return stringToNumber(column.width)

    const minWidth = column.minWidth || 80

    const tableWidth = instance!.vnode.el!.clientWidth

    const hasWidthColumns = columns.filter((column) => column.width)
    const noHasWidthColumns = columns.filter((column) => !column.width)
    const fixedWidth = hasWidthColumns.reduce((total, current) => {
      return total + stringToNumber(current.width!)
    }, 0)
    const flexWidth = tableWidth - fixedWidth

    const totalMinWidth = noHasWidthColumns.reduce((total, current) => {
      return total + (current.minWidth ? stringToNumber(current.minWidth) : 80)
    }, 0)

    if (totalMinWidth <= flexWidth) {
      const averageWidth = Math.floor((flexWidth - totalMinWidth) / noHasWidthColumns.length)
      return stringToNumber(minWidth) + averageWidth
    } else {
      return stringToNumber(minWidth)
    }
  }
  onMounted(() => {
    updateColumns(columns)
  })

  return {
    columns,
    insertColumn,
    updateColumns
  }
}
