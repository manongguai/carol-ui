<template>
  <div></div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { _component_Emits, _component_Props } from './-component-'
import useTheme from '@/hooks/use-theme'
import { _component_Light } from '../styles/light'

export default defineComponent({
  name: 'Cl_Component_',
  props: _component_Props,
  emits: _component_Emits,
  setup(props, { emit }) {
    const _component_Ref: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('_component_', _component_Light)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })

    return {
      cssVars: cssVarsRef,
      _component_Ref
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/-component-.scss';
</style>
