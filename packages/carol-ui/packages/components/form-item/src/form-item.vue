<template>
  <div :class="formItemKls" :style="cssVars">
    <div
      class="cl-form-item__label"
      v-if="!!hasLabel"
      :style="{
        width: labelWidth || 'auto'
      }"
    >
      {{ currentLabel }}
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
// import { addUnit, ensureArray, getProp, isBoolean, isFunction, isString } from '@kirkw/utils'
// import { useId, useNamespace } from '@element-plus/hooks'
// import { useFormSize } from './hooks'
// import FormLabelWrap from './form-label-wrap'
import type { RuleItem } from 'async-validator'
import { createIsClassName, createKey, type Arrayable } from '@kirkw/utils'
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
    const formItemRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()
    const slots = useSlots()
    const themeRef = useTheme('formItem', formItemLight)
    const formContext = inject(formInjectionKey)
    const parentFormItemContext = inject(formItemInjectionKey)
    const size = useFormSize()
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

    const formItemKls = computed(() => [
      'cl-form-item',
      createIsClassName('required', props.required === true),
      createIsClassName('no-asterisk', formContext?.hideRequiredAsterisk),
      `asterisk-right`
    ])
    const labelWidth = computed(() => {
      return 'auto'
    })
    const validateMessage = ref('')
    const shouldShowError = ref(false)
    return {
      cssVars: cssVarsRef,
      formItemRef,
      formItemKls,
      validateMessage,
      shouldShowError,
      labelWidth,
      currentLabel,
      hasLabel
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/form-item.scss';
</style>
