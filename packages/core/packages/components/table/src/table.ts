import type { ComponentInternalInstance, ExtractPropTypes, PropType } from 'vue'
import { useStore } from './store'
import type { TableLayout } from '@/constants/table'

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
  stripe: {
    type: Boolean,
    default: false
  }
}
export const tableEmits = {}
export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableInjection = TableProps & {
  store: ReturnType<typeof useStore>
}
