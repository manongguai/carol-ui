<template>
  <div></div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { scrollbarEmits, scrollbarProps } from './scrollbar'
import useTheme from '@/hooks/use-theme'
import { scrollbarLight } from '../styles/light'

export default defineComponent({
  name: 'ClScrollbar',
  props: scrollbarProps,
  emits: scrollbarEmits,
  setup(props, { emit }) {
    const scrollbarRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('scrollbar', scrollbarLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })

    return {
      cssVars: cssVarsRef,
      scrollbarRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/scrollbar.scss';
</style>
