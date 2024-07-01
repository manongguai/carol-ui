import { type ComponentSize } from '@/constants/size'
import { type Arrayable } from '@kirkw/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { FormItemRule } from '@/types/form'

export const formItemValidateStates = ['', 'error', 'validating', 'success'] as const

export type FormItemValidateState = (typeof formItemValidateStates)[number]

export type FormItemProp = Arrayable<string>
export const formItemProps = {
  label: String,
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description  A key of `model`. It could be an array of property paths (e.g `['a', 'b', 0]`). In the use of `validate` and `resetFields` method, the attribute is required.
   */
  prop: {
    type: [String, Array] as PropType<FormItemProp>
  },
  /**
   * @description Whether the field is required or not, will be determined by validation rules if omitted.
   */
  required: {
    type: Boolean,
    default: false
  },
  /**
   * @description Validation rules of form, see the [following table](#formitemrule), more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).
   */
  rules: {
    type: [Object, Array] as PropType<Arrayable<FormItemRule>>
  },
  /**
   * @description Field error message, set its value and the field will validate error and show this message immediately.
   */
  error: String,
  /**
   * @description Validation state of formItem.
   */
  validateStatus: {
    type: String as PropType<FormItemValidateState>
  },
  /**
   * @description Same as for in native label.
   */
  for: String,
  /**
   * @description Inline style validate message.
   */
  inlineMessage: {
    type: [String, Boolean],
    default: ''
  },
  /**
   * @description Whether to show the error message.
   */
  showMessage: {
    type: Boolean,
    default: true
  },
  /**
   * @description Control the size of components in this form-item.
   */
  size: {
    type: String as PropType<ComponentSize>
  }
}
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export const formItemEmits = {}
