import type { ComponentSize } from '@/constants/size'
import type { PropType } from 'vue'

export const inputGroupProps = {
  size: {
    type: String as PropType<ComponentSize | undefined>
  }
}
export const inputGroupEmits = {}

export interface InputGroupInjection {
  size?: ComponentSize | undefined
}
