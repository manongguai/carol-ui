import { isString } from '@kirkw/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export const predefineColorsProps = {
  colors: { type: Array as PropType<string[]>, required: true, default: () => [] },
  colorValue: { required: true, type: String, default: '' }
}
export const predefineColorsEmits = {
  colorSelected: (val: string) => isString(val)
}

export type PredefineColorsProps = ExtractPropTypes<typeof predefineColorsProps>

export interface PredefineColorsData {
  color: string
  selected: boolean
}
