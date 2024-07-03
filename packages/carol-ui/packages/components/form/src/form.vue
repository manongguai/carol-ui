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
  toRefs,
  watch
} from 'vue'
import { formEmits, formProps } from './form'
import useTheme from '@/hooks/use-theme'
import { formLight } from '../styles/light'
import type { ValidateFieldsError } from 'async-validator'
import { formInjectionKey } from './context'
import type {
  FormContext,
  FormItemContext,
  FormValidateCallback,
  FormValidationResult
} from '@/types/form'
import { filterFields, useFormLabelWidth } from '@/components/form-item/src/utils'
import { isFunction, type Arrayable, debugWarn } from '@kirkw/utils'
import type { FormItemProp } from '@/components/form-item/src/form-item'
export default defineComponent({
  name: 'ClForm',
  props: formProps,
  emits: formEmits,
  setup(props, { emit }) {
    const formRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('form', formLight)

    // 收集字段
    const fields: FormItemContext[] = []

    const addField: FormContext['addField'] = (field) => {
      fields.push(field)
    }

    const removeField: FormContext['removeField'] = (field) => {
      if (field.prop) {
        fields.splice(fields.indexOf(field), 1)
      }
    }

    // 重置表单
    const resetFields: FormContext['resetFields'] = (properties = []) => {
      if (!props.model) {
        debugWarn('ClForm', 'model is required for resetFields to work.')
        return
      }
      filterFields(fields, properties).forEach((field) => field.resetField())
    }

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })
    const formKls = computed(() => ['cl-form'])
    const validate = async function (callback?: FormValidateCallback): FormValidationResult {
      // 验证字段
      return validateField(undefined, callback)
    }

    const clearValidate: FormContext['clearValidate'] = (props = []) => {
      filterFields(fields, props).forEach((field) => field.clearValidate())
    }

    const validateField: FormContext['validateField'] = async (modelProps = [], callback) => {
      const shouldThrow = !isFunction(callback)
      try {
        const result = await doValidateField(modelProps)
        // When result is false meaning that the fields are not validatable
        if (result === true) {
          callback?.(result)
        }
        return result
      } catch (e) {
        if (e instanceof Error) throw e
        const invalidFields = e as ValidateFieldsError
        if (props.scrollToError) {
          // scrollToField(Object.keys(invalidFields)[0])
        }
        callback?.(false, invalidFields)
        return shouldThrow && Promise.reject(invalidFields)
      }
    }
    const isValidatable = computed(() => {
      const hasModel = !!props.model
      if (!hasModel) {
        debugWarn('ClForm', 'model is required for validate to work.')
      }
      return hasModel
    })

    const doValidateField = async (props: Arrayable<FormItemProp> = []): Promise<boolean> => {
      if (!isValidatable.value) return false

      const fields = obtainValidateFields(props)
      if (fields.length === 0) return true

      let validationErrors: ValidateFieldsError = {}
      for (const field of fields) {
        try {
          await field.validate('')
        } catch (fields) {
          validationErrors = {
            ...validationErrors,
            ...(fields as ValidateFieldsError)
          }
        }
      }
      if (Object.keys(validationErrors).length === 0) return true
      return Promise.reject(validationErrors)
    }
    const obtainValidateFields = (props: Arrayable<FormItemProp>) => {
      if (fields.length === 0) return []

      const filteredFields = filterFields(fields, props)
      if (!filteredFields.length) {
        debugWarn('ClForm', 'please pass correct props!')
        return []
      }
      return filteredFields
    }

    watch(
      () => props.rules,
      () => {
        if (props.validateOnRuleChange) {
          validate().catch((err) => debugWarn(err))
        }
      },
      { deep: true }
    )

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
