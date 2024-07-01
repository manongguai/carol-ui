<template>
  <div
    :class="{
      formItemKls
    }"
  >
    <div
      class="cl-form-item__label"
      v-if="!!label"
      :style="{
        width: labelWidth || '90px'
      }"
    >
      {{ label }}
    </div>
    <div class="cl-form-item__content">
      <slot />
      <transition-group :name="`cl-form-item-zoom-in-top`">
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
import type { Arrayable } from '@kirkw/utils'
import type { FormItemContext, FormItemRule, FormValidateFailure } from '@/types/form'
import type { FormItemValidateState } from './form-item'
import { formInjectionKey } from '@/components/form/src/context'
import { formItemInjectionKey } from './context'

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
    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })
    const formItemKls = computed(() => ['cl-form-item'])

    const validateMessage = ref('')
    const shouldShowError = ref(false)
    return {
      cssVars: cssVarsRef,
      formItemRef,
      formItemKls,
      validateMessage,
      shouldShowError
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/form-item.scss';
</style>
