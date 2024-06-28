<template>
  <span class="cl-input-group" :style="(cssVars as CSSProperties)">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { inputGroupEmits, inputGroupProps } from './input-group'
import useTheme from '@/hooks/use-theme'
import { inputGroupLight } from '../../input/styles/input-light'

export default defineComponent({
  name: 'ClInputGroup',
  props: inputGroupProps,
  emits: inputGroupEmits,
  setup() {
    const inputGroupRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('inputGroup', inputGroupLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme
      const { inputColor, inputRadius, inputBorder, inputFontSize } = self
      return {
        '--cl-input-color': inputColor,
        '--cl-input-font-size': inputFontSize,
        '--cl-input-border': inputBorder,
        '--cl-input-border-radius': inputRadius
      }
    })

    return {
      cssVars: cssVarsRef,
      inputGroupRef
    }
  }
})
</script>

<style lang="scss">
@import '../styles/input-group.scss';
</style>
