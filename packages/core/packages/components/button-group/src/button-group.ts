import type { ComponentSize } from '@/constants/size'
import type { ExtractPropTypes, PropType } from 'vue'

export const buttonGroupProps = {
  size: {
    type: String as PropType<ComponentSize | undefined>,
    default: undefined
  },
  vertical: Boolean
} as const

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export interface ButtonGroupInjection {
  size?: ComponentSize | undefined
}
