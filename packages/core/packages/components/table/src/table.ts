import type { ComponentInternalInstance, ExtractPropTypes, PropType } from 'vue'
import { useStore } from './store'
import type { TableLayout } from '@/constants/table'
import type { TextAlign } from '@/constants/common'

export type DefaultRow = any
export const tableProps = {
  data: {
    type: Array as PropType<DefaultRow[]>,
    default: () => []
  },
  tableLayout: {
    type: String as PropType<TableLayout>,
    default: () => 'fixed'
  },
  showHeader: {
    type: Boolean,
    default: () => true
  },
  stripe: Boolean,
  width: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  height: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false
  },
  align: {
    type: String as PropType<TextAlign>
  },
  rowClassName: {
    type: [String, Function] as PropType<string | ((row: DefaultRow, index: number) => string)>
  },
  cellClassName: {
    type: [String, Function] as PropType<
      string | ((row: DefaultRow, column: any, rowIndex: number, columnIndex: number) => string)
    >
  },
  rowStyle: {
    type: [String, Function] as PropType<string | ((row: DefaultRow, index: number) => string)>
  },
  cellStyle: {
    type: [String, Function] as PropType<
      string | ((row: DefaultRow, column: any, rowIndex: number, columnIndex: number) => string)
    >
  }
}
export const tableEmits = {}
export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableInjection = TableProps & {
  store: ReturnType<typeof useStore>
}
