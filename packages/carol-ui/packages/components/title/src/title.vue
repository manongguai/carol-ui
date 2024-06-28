<!--
 * @Author: lujingjing
 * @Date: 2023-07-19 14:07:44
 * @LastEditTime: 2023-07-27 16:16:12
 * @Description: 
 * @FilePath: /web-vue/packages/components/title/src/title.vue
-->
<template>
  <div :class="[`cl-title`, `cl-title--${mode}`]" :style="(cssVars as CSSProperties)">
    <slot>{{ title }}</slot>
  </div>
</template>
<script lang="ts">
import { titleLight } from '../styles/light'
import useTheme from '../../../hooks/use-theme'
import { computed, defineComponent, type CSSProperties } from 'vue'
import { titleProps } from './title'
export default defineComponent({
  name: 'ClTitle',
  props: titleProps,
  setup() {
    const themeRef = useTheme('title', titleLight)
    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme
      const {
        fontWeightStrong,
        borderLine,
        titleColor,
        fontSize,
        textColorMinor,
        rowTitlePaddingLeft,
        rowWidth,
        rowHeight,
        rowTop,
        colPadding
      } = self

      const fontProps = {
        '--cl-font-weight': fontWeightStrong,
        '--cl-title-color': titleColor,
        '--cl-title-size': fontSize
      }

      const colTypeProps = {
        '--cl-font-row-color': borderLine,
        '--cl-title-row-paddding': colPadding
      }
      const rowTypeProps = {
        '--cl-font-col-color': textColorMinor,
        '--cl-font-title-padding': rowTitlePaddingLeft,
        '--cl-title-row-width': rowWidth,
        '--cl-title-row-height': rowHeight,
        '--cl-title-row-top': rowTop
      }
      return {
        ...fontProps,
        ...colTypeProps,
        ...rowTypeProps
      }
    })

    return {
      cssVars: cssVarsRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/title.scss';
</style>
