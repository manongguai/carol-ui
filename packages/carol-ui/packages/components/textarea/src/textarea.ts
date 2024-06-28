import type { ExtractPropTypes, PropType } from 'vue'
import { isString } from '@kirkw/utils'
export const textareaProps = {
  value: String,
  placeholder: {
    type: String,
    default: '请输入'
  },
  disabled: Boolean,
  readonly: Boolean,
  resize: String,
  autoSize: {
    type: Boolean,
    default: true
  },
  rows: {
    type: Number,
    default: 2
  },
  inputWidth: {
    type: Number,
    default: 240
  },
  minRows: {
    type: Number,
    default: 1
  },
  maxRows: {
    type: Number,
    default: Infinity
  },
  placeholderText: {
    type: String,
    default: '请输入'
  },
  modelValue: {
    type: String,
    default: ''
  },
  maxlength: Number,
  showWordLimit: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  }
} as const

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export const textareaEmits = {
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
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  clear: () => true
}
export type TextareaEmits = typeof textareaEmits
