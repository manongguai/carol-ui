import { isNumber } from '@kirkw/utils'
import type { ExtractPropTypes } from 'vue'

export const svPanelProps = {
  background: {
    type: String,
    required: true
  },
  saturation: {
    type: Number,
    required: true
  },
  svValue: {
    type: Number,
    required: true
  }
}
export const svPanelEmits = {
  svChange: (val: number[]) => val instanceof Array
}

export type SvPanelProps = ExtractPropTypes<typeof svPanelProps>
