<template>
  <i :class="[`cl-icon`]" :style="cssVars" v-bind="$attrs">
    <svg class="icon" aria-hidden="true" v-if="hasIcon" viewBox="0 0 1024 1024">
      <use :xlink:href="icon"></use>
    </svg>
    <slot></slot>
  </i>
</template>
<script lang="ts">
import { defineComponent, type CSSProperties, computed } from 'vue'
import { iconProps } from './icon'
import useTheme from '@/hooks/use-theme'
import { iconLight } from '../styles/light'

export default defineComponent({
  name: 'ClIcon',
  inheritAttrs: false,
  props: iconProps,

  setup(props) {
    const themeRef = useTheme('icon', iconLight)

    const iconRef = computed(() => {
      return `#${props.iconName}`
    })

    const hasIcon = computed(() => {
      return props.iconName != null
    })

    const cssVarsRef = computed<CSSProperties>(() => {
      const { self } = themeRef.value
      const { color } = self
      const mergedColor = props.color || color
      return {
        '--cl-color': mergedColor
      }
    })

    return {
      cssVars: cssVarsRef,
      icon: iconRef,
      hasIcon
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/icon.scss';
</style>
