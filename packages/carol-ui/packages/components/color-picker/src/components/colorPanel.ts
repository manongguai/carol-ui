import { isString } from '@kirkw/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export const colorPanelProps = {
  predefine: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  modelValue: {
    type: String,
    default: ''
  }
}
export const colorPanelEmits = {
  colorSave: () => {},
  'update:modelValue': (val: string) => isString(val)
}

export type ColorPanelProps = ExtractPropTypes<typeof colorPanelProps>
