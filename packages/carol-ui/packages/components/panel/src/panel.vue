<template>
  <div class="cl-panel" :style="(cssVars as CSSProperties)">
    <div class="cl-panel-title" v-if="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { panelProps } from './panel'
import useTheme from '@/hooks/use-theme'
import { panelLight } from '../styles/light'

export default defineComponent({
  name: 'ClPanel',
  props: panelProps,
  setup() {
    const panelRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('panel', panelLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme
      const {
        color,
        bgColor,
        panelMargin,
        borderRadio,
        panelPadding,
        fontSize,
        titlePadding,
        titleWidth,
        titleHeight,
        titleTypeColor
      } = self

      const panelStyle = {
        '--cl-panel-bg': bgColor,
        '--cl-panel-padding': panelPadding,
        '--cl-panel-border-radio': borderRadio,
        '--cl-panel-margin': panelMargin
      }
      const titleStyle = {
        '--cl-panel-title-color': color,
        '--cl-panel-title-size': fontSize,
        '--cl-panel-title-width': titleWidth,
        '--cl-panel-title-height': titleHeight,
        '--cl-panel-title-style-color': titleTypeColor,
        '--cl-panel-title-padding': titlePadding
      }

      return { ...panelStyle, ...titleStyle }
    })

    return {
      cssVars: cssVarsRef,
      panelRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/panel.scss';
</style>
