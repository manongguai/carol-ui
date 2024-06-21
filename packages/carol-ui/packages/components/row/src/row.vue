<template>
  <component :is="tag" :class="rowKls" :style="(cssVars as CSSProperties)" ref="rowRef">
    <slot />
  </component>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, provide, type Ref } from 'vue'
import { rowEmits, rowProps } from './row'
import { createIsClassName } from '@/utils'
import { rowInjectionKey } from './context'
export default defineComponent({
  name: 'ClRow',
  props: rowProps,
  emits: rowEmits,
  setup(props, { emit }) {
    const rowRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()
    const gutter = computed(() => props.gutter)
    const cssVarsRef = computed<CSSProperties>(() => {
      const styles: CSSProperties = {}
      if (!props.gutter) {
        return styles
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
      return styles
    })
    const rowKls = computed(() => [
      'cl-row',
      createIsClassName(`justify-${props.justify}`, props.justify !== 'start'),
      createIsClassName(`align-${props.align}`, props.align !== 'top')
    ])

    provide(rowInjectionKey, {
      gutter
    })
    return {
      cssVars: cssVarsRef,
      rowRef,
      rowKls
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/row.scss';
</style>
