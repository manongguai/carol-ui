import type { ComponentInternalInstance, PropType } from 'vue'
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
  }
}
export const tableEmits = {}

export type TableInjection = {
  store: ReturnType<typeof useStore>
  data: DefaultRow[]
}
