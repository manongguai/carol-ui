import { type ComponentSize } from '@/constants/size'
import form from './form.vue'
import type { ExtractPropTypes, PropType, UnwrapRef, SetupContext } from 'vue'
import type { Rules } from 'async-validator'
import type { FormLabelPosition, RequireAsteriskPosition } from '@/constants/form'
import type { FormItemProp } from '@/components/form-item/src/form-item'
import { isArray, isBoolean, isString, type Arrayable } from '@kirkw/utils'
import type {
  FormItemContext,
  FormValidateCallback,
  FormValidationResult
} from '../../../types/form'
export const formProps = {
  size: {
    type: String as PropType<ComponentSize>,
    default: 'medium'
  },
  disabled: Boolean,
  model: Object,
  rules: {
    type: Object as PropType<Rules>
  },
  /**
   * @description Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required.
   */
  labelPosition: {
    type: String as PropType<FormLabelPosition>,
    default: 'right'
  },
  /**
   * @description Position of asterisk.
   */
  requireAsteriskPosition: {
    type: String as PropType<RequireAsteriskPosition>,
    default: 'left'
  },
  /**
   * @description Width of label, e.g. `'50px'`. All its direct child form items will inherit this value. `auto` is supported.
   */
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description Suffix of the label.
   */
  labelSuffix: {
    type: String,
    default: ''
  },
  /**
   * @description Whether the form is inline.
   */
  inline: Boolean,
  /**
   * @description Whether to display the error message inline with the form item.
   */
  inlineMessage: Boolean,
  /**
   * @description Whether to display an icon indicating the validation result.
   */
  statusIcon: Boolean,
  /**
   * @description Whether to show the error message.
   */
  showMessage: {
    type: Boolean,
    default: true
  },
  /**
   * @description Whether to trigger validation when the `rules` prop is changed.
   */
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  /**
   * @description Whether to hide required fields should have a red asterisk (star) beside their labels.
   */
  hideRequiredAsterisk: Boolean,
  /**
   * @description When validation fails, scroll to the first error form entry.
   */
  scrollToError: Boolean,
  /**
   * @description When validation fails, it scrolls to the first error item based on the scrollIntoView option.
   */
  scrollIntoViewOptions: {
    type: [Object, Boolean],
    default: {
      block: 'center'
    }
  }
}
export type FormProps = ExtractPropTypes<typeof formProps>
export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) && isBoolean(isValid) && isString(message)
}
export type FormEmits = typeof formEmits

export type FormInjection = {}
