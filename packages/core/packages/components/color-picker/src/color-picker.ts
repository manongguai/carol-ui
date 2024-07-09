import { isString } from '@kirkw/utils'
import type { ExtractPropTypes, PropType } from 'vue'
export type Size = 'small' | 'medium'
export const colorPickerProps = {
  modelValue: {
    type: String,
    default: ''
  },
  //   可选值 ： default,small
  size: {
    type: String as PropType<Size>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: String,
    default: ''
  },
  predefine: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  showResetButton: {
    type: Boolean,
    default: true
  },
  showColorInput: {
    type: Boolean,
    default: true
  },
  showColorIcon: {
    type: Boolean,
    default: true
  },
  resetColor: {
    type: String,
    default: ''
  }
}
export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export const colorPickerEmits = {
  'update:modelValue': (val: string) => isString(val),
  change: (val: string) => isString(val),
  reset: () => {}
}
