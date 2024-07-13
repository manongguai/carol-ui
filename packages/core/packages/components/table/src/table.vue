<template>
  <div></div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref } from 'vue'
import { tableEmits, tableProps } from './table'
import useTheme from '@/hooks/use-theme'
import { tableLight } from '../styles/light'

export default defineComponent({
  name: 'ClTable',
  props: tableProps,
  emits: tableEmits,
  setup(props, { emit }) {
    const tableRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('table', tableLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })

    return {
      cssVars: cssVarsRef,
      tableRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/table.scss';
</style>
