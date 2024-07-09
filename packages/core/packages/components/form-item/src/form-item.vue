<template>
  <div :class="formItemCls" :style="cssVars">
    <div
      v-if="!!hasLabel"
      :style="{
        width: labelWidthWithPosition
      }"
      :class="formItemLabelCls"
    >
      <slot name="label" :label="currentLabel">
        {{ currentLabel }}
      </slot>
    </div>
    <div class="cl-form-item__content">
      <slot />
      <transition-group :name="`cl-zoom-in-top`">
        <slot v-if="shouldShowError" name="error" :error="validateMessage">
          <div class="cl-form-item__error-message" v-if="validateMessage">
            {{ validateMessage }}
          </div>
        </slot>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import {
  type CSSProperties,
  computed,
  defineComponent,
  ref,
  type Ref,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  toRefs,
  useSlots,
  watch
} from 'vue'
import { formItemEmits, formItemProps } from './form-item'
import useTheme from '@/hooks/use-theme'
import { formItemLight } from '../styles/light'
import {} from 'vue'
import AsyncValidator from 'async-validator'
import { refDebounced } from '@vueuse/core'
import { clone } from 'lodash'
import type { RuleItem } from 'async-validator'
import {
  addUnit,
  createIsClassName,
  createKey,
  ensureArray,
  getProp,
  isFunction,
  isString,
  type Arrayable
} from '@kirkw/utils'
import type { FormItemContext, FormItemRule, FormValidateFailure } from '@/types/form'
import type { FormItemValidateState } from './form-item'
import { formInjectionKey } from '@/components/form/src/context'
import { formItemInjectionKey } from './context'
import { useFormSize } from '@/hooks/use-form-props'

export default defineComponent({
  name: 'ClFormItem',
  props: formItemProps,
  emits: formItemEmits,
  setup(props, { emit }) {
    const formItemRef: Ref<HTMLDivElement | undefined> = ref<HTMLDivElement | undefined>()
    const slots = useSlots()
    const themeRef = useTheme('formItem', formItemLight)
    const formContext = inject(formInjectionKey)
    const parentFormItemContext = inject(formItemInjectionKey)
    const size = useFormSize(undefined, { formItem: false })

    // 验证状态
    const validateState = ref<FormItemValidateState>('')
    const validateStateDebounced = refDebounced(validateState, 100)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self, common } = theme
      // size
      const {
        [createKey('labelFontSize', size.value)]: fontSize,
        [createKey('marginBottom', size.value)]: marginBottom
      } = self

      const sizeProps = {
        '--cl-form-label-font-size': fontSize,
        '--cl-form-error-message-font-size': common.fontSizeSmall,
        '--cl-form-margin-bottom': marginBottom
      }
      const colorProps = {
        '--cl-form-label-color': common.textColor3,
        '--cl-form-error-message-color': common.warningColor,
        '--cl-color-error': common.errorColor
      }

      return {
        ...sizeProps,
        ...colorProps
      }
    })
    const hasLabel = computed<boolean>(() => {
      return !!(props.label || slots.label)
    })
    const currentLabel = computed(() => `${props.label || ''}${formContext?.labelSuffix || ''}`)

    const labelWidth = computed(() => {
      const labelWidth = props.labelWidth || formContext?.labelWidth || ''
      return addUnit(labelWidth)
    })

    const validateMessage = ref('')
    const shouldShowError = computed(
      () =>
        validateStateDebounced.value === 'error' &&
        props.showMessage &&
        (formContext?.showMessage ?? true)
    )
    let initialValue: any = undefined

    let isResettingField = false

    const normalizedRules = computed(() => {
      const { required } = props

      const rules: FormItemRule[] = []

      if (props.rules) {
        rules.push(...ensureArray(props.rules))
      }

      const formRules = formContext?.rules
      if (formRules && props.prop) {
        const _rules = getProp<Arrayable<FormItemRule> | undefined>(formRules, props.prop).value
        if (_rules) {
          rules.push(...ensureArray(_rules))
        }
      }
      if (required !== undefined) {
        const requiredRules = rules
          .map((rule, i) => [rule, i] as const)
          .filter(([rule]) => Object.keys(rule).includes('required'))
        if (requiredRules.length > 0) {
          for (const [rule, i] of requiredRules) {
            if (rule.required === required) continue
            rules[i] = { ...rule, required }
          }
        } else {
          rules.push({ required })
        }
      }
      return rules
    })

    const isRequired = computed(() => normalizedRules.value.some((rule) => rule.required))

    const propString = computed(() => {
      if (!props.prop) return ''
      return isString(props.prop) ? props.prop : props.prop.join('.')
    })

    const fieldValue = computed(() => {
      const model = formContext?.model
      if (!model || !props.prop) {
        return
      }
      return getProp(model, props.prop).value
    })
    const validateEnabled = computed(() => normalizedRules.value.length > 0)
    const setValidationState = (state: FormItemValidateState) => {
      validateState.value = state
    }
    const getFilteredRule = (trigger: string) => {
      const rules = normalizedRules.value
      return (
        rules
          .filter((rule) => {
            if (!rule.trigger || !trigger) return true
            if (Array.isArray(rule.trigger)) {
              return rule.trigger.includes(trigger)
            } else {
              return rule.trigger === trigger
            }
          })
          // exclude trigger
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ trigger, ...rule }): RuleItem => rule)
      )
    }

    const onValidationFailed = (error: FormValidateFailure) => {
      const { errors, fields } = error
      if (!errors || !fields) {
        console.error(error)
      }

      setValidationState('error')
      validateMessage.value = errors ? errors?.[0]?.message ?? `${props.prop} is required` : ''

      formContext?.emit('validate', props.prop!, false, validateMessage.value)
    }

    const onValidationSucceeded = () => {
      setValidationState('success')
      formContext?.emit('validate', props.prop!, true, '')
    }

    const doValidate = async (rules: RuleItem[]): Promise<true> => {
      const modelName = propString.value
      const validator = new AsyncValidator({
        [modelName]: rules
      })
      return validator
        .validate({ [modelName]: fieldValue.value }, { firstFields: true })
        .then(() => {
          onValidationSucceeded()
          return true as const
        })
        .catch((err: FormValidateFailure) => {
          onValidationFailed(err as FormValidateFailure)
          return Promise.reject(err)
        })
    }

    const validate: FormItemContext['validate'] = async (trigger, callback) => {
      // skip validation if its resetting
      if (isResettingField || !props.prop) {
        return false
      }

      const hasCallback = isFunction(callback)
      if (!validateEnabled.value) {
        callback?.(false)
        return false
      }

      const rules = getFilteredRule(trigger)

      if (rules.length === 0) {
        callback?.(true)
        return true
      }

      setValidationState('validating')

      return doValidate(rules)
        .then(() => {
          callback?.(true)
          return true as const
        })
        .catch((err: FormValidateFailure) => {
          const { fields } = err
          callback?.(false, fields)
          return hasCallback ? false : Promise.reject(fields)
        })
    }

    const clearValidate: FormItemContext['clearValidate'] = () => {
      setValidationState('')
      validateMessage.value = ''
      isResettingField = false
    }

    const resetField: FormItemContext['resetField'] = async () => {
      const model = formContext?.model
      if (!model || !props.prop) return

      const computedValue = getProp(model, props.prop)

      // prevent validation from being triggered
      isResettingField = true

      computedValue.value = clone(initialValue)

      await nextTick()
      clearValidate()

      isResettingField = false
    }

    const context: FormItemContext = reactive({
      ...toRefs(props),
      $el: formItemRef,
      size: size,
      validateState: validateState,
      hasLabel: hasLabel,
      resetField,
      clearValidate,
      validate
    })
    onMounted(() => {
      if (props.prop) {
        formContext?.addField(context)
        initialValue = clone(fieldValue.value)
      }
    })
    provide(formItemInjectionKey, context)
    onBeforeUnmount(() => {
      formContext?.removeField(context)
    })

    const formItemCls = computed(() => {
      return [
        'cl-form-item',
        createIsClassName('required', isRequired.value || props.required === true),
        createIsClassName('no-asterisk', formContext?.hideRequiredAsterisk),
        createIsClassName('label-position__top', formContext?.labelPosition === 'top'),
        `asterisk-${formContext?.requireAsteriskPosition}`
      ]
    })
    const labelWidthWithPosition = computed(() => {
      return formContext?.labelPosition === 'top' ? '100%' : labelWidth.value || 'auto'
    })
    const formItemLabelCls = computed(() => {
      return ['cl-form-item__label', `cl-form-item__label__${formContext?.labelPosition}`]
    })

    return {
      cssVars: cssVarsRef,
      formItemRef,
      formItemCls,
      validateMessage,
      shouldShowError,
      labelWidth,
      currentLabel,
      hasLabel,
      isRequired,
      formItemLabelCls,
      labelWidthWithPosition
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/form-item.scss';
</style>
