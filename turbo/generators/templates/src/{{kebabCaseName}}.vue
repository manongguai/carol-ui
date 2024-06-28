<template>
  <div></div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { {{lowerCamelCaseName}}Emits, {{lowerCamelCaseName}}Props } from './{{kebabCaseName}}'
import useTheme from '@/hooks/use-theme'
import { {{lowerCamelCaseName}}Light } from '../styles/light'

export default defineComponent({
  name: 'Cl{{upperCamelCaseName}}',
  props: {{lowerCamelCaseName}}Props,
  emits: {{lowerCamelCaseName}}Emits,
  setup(props, { emit }) {
    const {{lowerCamelCaseName}}Ref: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('{{lowerCamelCaseName}}', {{lowerCamelCaseName}}Light)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })

    return {
      cssVars: cssVarsRef,
      {{lowerCamelCaseName}}Ref
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/{{kebabCaseName}}.scss';
</style>
