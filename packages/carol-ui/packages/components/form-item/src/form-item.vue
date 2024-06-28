<template>
  <div></div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { formItemEmits, formItemProps } from './form-item'
import useTheme from '@/hooks/use-theme'
import { formItemLight } from '../styles/light'

export default defineComponent({
  name: 'ClFormItem',
  props: formItemProps,
  emits: formItemEmits,
  setup(props, { emit }) {
    const formItemRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('formItem', formItemLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })

    return {
      cssVars: cssVarsRef,
      formItemRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/form-item.scss';
</style>
