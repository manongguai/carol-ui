import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber, isNil } from '@/utils/common'
export const inputNumberProps = {
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY
  },
  step: {
    type: Number,
    default: 1
  },
  layout: {
    type: String as PropType<'between' | 'right' | 'none'>,
    default: 'right'
  },
  // 数值精度：小数位数(正整数)
  precision: {
    type: Number,
    validator: (val: number) => {
      return val >= 0 && val === Number.parseInt(`${val}`, 10)
    }
  },
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
  modelValue: Number,
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
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>

export const inputNumberEmits = {
  ['update:modelValue']: (val: number) => isNumber(val),
  change: (val: number) => isNumber(val),
  input: (val: number) => isNumber(val),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  clear: () => true
}

export type InputNumberEmits = typeof inputNumberEmits
