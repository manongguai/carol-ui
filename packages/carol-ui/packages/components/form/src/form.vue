<template>
  <div></div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { formEmits, formProps } from './form'
import useTheme from '@/hooks/use-theme'
import { formLight } from '../styles/light'

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

    return {
      cssVars: cssVarsRef,
      formRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/form.scss';
</style>
