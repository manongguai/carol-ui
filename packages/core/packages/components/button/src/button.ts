import type { ComponentSize } from '@/constants/size'
import type { ExtractPropTypes, PropType } from 'vue'

export type Type =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'minor'
  | 'dashed'
  | 'link'
  | 'text'
  | 'underlined'

export type Scene = 'normal' | 'info' | 'warning'

export const buttonProps = {
  color: String,
  textColor: String,
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  icon: String,
  iconColor: String,
  size: String as PropType<ComponentSize>,
  round: Boolean,
  scene: {
    type: String as PropType<Scene>,
    default: 'normal'
  },
  type: {
    type: String as PropType<Type>,
    default: 'default'
  },
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type ButtonEmits = typeof buttonEmits
