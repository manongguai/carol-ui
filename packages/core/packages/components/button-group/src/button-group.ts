import type { Size } from '@/components/button/src/button'
import type { ExtractPropTypes, PropType } from 'vue'

export const buttonGroupProps = {
  size: {
    type: String as PropType<Size | undefined>,
    default: undefined
  },
  vertical: Boolean
} as const

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export interface ButtonGroupInjection {
  size?: Size | undefined
}
