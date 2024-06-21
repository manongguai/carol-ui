<template>
  <div></div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { colEmits, colProps } from './col'
import useTheme from '@/hooks/use-theme'
import { colLight } from '../styles/light'

export default defineComponent({
  name: 'ClCol',
  props: colProps,
  emits: colEmits,
  setup(props, { emit }) {
    const colRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('col', colLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })

    return {
      cssVars: cssVarsRef,
      colRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/col.scss';
</style>
