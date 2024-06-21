<template>
  <div></div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { rowEmits, rowProps } from './row'
import useTheme from '@/hooks/use-theme'
import { rowLight } from '../styles/light'

export default defineComponent({
  name: 'ClRow',
  props: rowProps,
  emits: rowEmits,
  setup(props, { emit }) {
    const rowRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('row', rowLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })

    return {
      cssVars: cssVarsRef,
      rowRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/row.scss';
</style>
