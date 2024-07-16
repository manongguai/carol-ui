import type { ComponentInternalInstance, PropType } from 'vue'
import { useStore } from './store'

export type DefaultRow = any
export const tableProps = {
  data: {
    type: Array as PropType<DefaultRow[]>,
    default: () => []
  }
}
export const tableEmits = {}

export type TableInjection = {
  store: ReturnType<typeof useStore>
}
