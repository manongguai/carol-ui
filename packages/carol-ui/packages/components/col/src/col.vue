<template>
  <component :is="tag" :class="colKls" :style="cssVars">
    <slot />
  </component>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref, inject } from 'vue'
import { colEmits, colProps } from './col'
import useTheme from '@/hooks/use-theme'
import { colLight } from '../styles/light'
import { rowInjectionKey } from '@/components/row/src/context'
import { isNumber, isObject, createIsClassName } from '@kirkw/utils'
export default defineComponent({
  name: 'ClCol',
  props: colProps,
  emits: colEmits,
  setup(props, { emit }) {
    const { gutter } = inject(rowInjectionKey, { gutter: computed(() => 0) })
    const colRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const cssVarsRef = computed<CSSProperties>(() => {
      const styles: CSSProperties = {}
      if (gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
      }
      return styles
    })
    const colKls = computed(() => {
      const classes: string[] = []
      const pos = ['span', 'offset', 'pull', 'push'] as const

      pos.forEach((prop) => {
        const size = props[prop]
        if (isNumber(size)) {
          if (prop === 'span') classes.push(`cl-col-${props[prop]}`)
          else if (size > 0) classes.push(`cl-col-${prop}-${props[prop]}`)
        }
      })

      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      sizes.forEach((size) => {
        if (isNumber(props[size])) {
          classes.push(`cl-col-${size}-${props[size]}`)
        } else if (isObject(props[size])) {
          Object.entries(props[size]).forEach(([prop, sizeProp]) => {
            classes.push(
              prop !== 'span' ? `cl-col-${size}-${prop}-${sizeProp}` : `cl-col-${size}-${sizeProp}`
            )
          })
        }
      })

      // this is for the fix
      if (gutter.value) {
        classes.push(createIsClassName('guttered'))
      }
      return ['cl-col', classes]
    })
    return {
      cssVars: cssVarsRef,
      colRef,
      colKls
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/col.scss';
</style>
