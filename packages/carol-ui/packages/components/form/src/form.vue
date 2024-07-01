<template>
  <form :class="formKls">
    <slot />
  </form>
</template>

<script lang="ts">
import {
  type CSSProperties,
  computed,
  defineComponent,
  ref,
  type Ref,
  provide,
  reactive,
  toRefs
} from 'vue'
import { formEmits, formProps } from './form'
import useTheme from '@/hooks/use-theme'
import { formLight } from '../styles/light'
import type { ValidateFieldsError } from 'async-validator'
import { formInjectionKey } from './context'
import type { FormContext, FormItemContext, FormValidationResult } from '@/types/form'
import { useFormLabelWidth } from '@/components/form-item/src/utils'
export default defineComponent({
  name: 'ClForm',
  props: formProps,
  emits: formEmits,
  setup(props, { emit }) {
    const formRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('form', formLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })
    const formKls = computed(() => ['cl-form'])
    const validate = async function (callback: (valid: boolean) => void) {
      console.log(111)
    }

    const clearValidate: FormContext['clearValidate'] = (props = []) => {}
    const validateField: FormContext['validateField'] = async (modelProps = []) => {
      return Promise.resolve(false)
    }
    const addField = (field: FormItemContext) => {}
    const removeField = (field: FormItemContext) => {}
    // 重置表单
    const resetFields = () => {}
    provide(formInjectionKey, {
      ...props,
      emit,
      resetFields,
      clearValidate,
      validateField,
      addField,
      removeField,
      ...useFormLabelWidth()
    })
    return {
      cssVars: cssVarsRef,
      formRef,
      formKls,
      validate,
      resetFields
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/form.scss';
</style>
