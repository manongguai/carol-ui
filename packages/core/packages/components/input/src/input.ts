import type { ExtractPropTypes, PropType } from 'vue'
import { isString } from '@kirkw/utils'
import type { ComponentSize } from '@/constants/size'
export type Type = 'text' | 'password' | 'phone'
export const inputProps = {
  size: {
    type: String as PropType<ComponentSize | undefined>
  },
  maxlength: Number,
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  inputWidth: {
    type: Number,
    default: 240
  },
  placeholderText: {
    type: String,
    default: '请输入'
  },
  visibilityToggle: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: [String, Number] as PropType<String | Number>,
    default: ''
  },
  type: {
    type: String as PropType<Type>,
    default: 'text'
  }
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  ['update:modelValue']: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  compositionstart: (evt: Event) => evt instanceof Event,
  compositionend: (evt: Event) => evt instanceof Event,
  keydown: (evt: KeyboardEvent | Event) => evt instanceof Event,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  clear: () => true
}
export type InputEmits = typeof inputEmits
