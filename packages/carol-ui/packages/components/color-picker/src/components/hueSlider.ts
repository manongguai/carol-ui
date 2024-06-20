import { isNumber } from '@/utils/common'
import type { ExtractPropTypes } from 'vue'

export const hueSliderProps = {
  hue: {
    type: Number,
    required: true
  }
}
export const hueSliderEmits = {
  hueChange: (val: number) => isNumber(val)
}

export type HueSliderProps = ExtractPropTypes<typeof hueSliderProps>
