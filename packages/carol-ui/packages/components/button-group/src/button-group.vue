<template>
  <div :class="[`cl-button-group`, vertical && `cl-button-group--vertical`]">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue'
import { buttonGroupInjectionKey } from './context'
import { buttonGroupProps } from './button-group'

export default defineComponent({
  name: 'ClButtonGroup',
  props: buttonGroupProps,
  setup(props) {
    // const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    // useStyle('-button-group', style, mergedClsPrefixRef)
    provide(buttonGroupInjectionKey, props)
    // const rtlEnabledRef = useRtl(
    //   'ButtonGroup',
    //   mergedRtlRef,
    //   mergedClsPrefixRef
    // )
    return {
      //   rtlEnabled: rtlEnabledRef,
      //   mergedClsPrefix: mergedClsPrefixRef
    }
  }
})
</script>
<style lang="scss">
@import '../styles/button-group.scss';
</style>
