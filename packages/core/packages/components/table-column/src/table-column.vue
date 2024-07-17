<template>
  <div></div>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref, inject } from 'vue'
import { tableColumnEmits, tableColumnProps } from './table-column'
import useTheme from '@/hooks/use-theme'
import { tableColumnLight } from '../styles/light'
import { tableInjectionKey } from '@/components/table/src/context'
import { addUnit } from '@kirkw/utils'

export default defineComponent({
  name: 'ClTableColumn',
  props: tableColumnProps,
  emits: tableColumnEmits,
  setup(props, { emit }) {
    const tableColumnRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()

    const themeRef = useTheme('tableColumn', tableColumnLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })

    const context = inject(tableInjectionKey)

    const columnOptions = {
      prop: props.prop!,
      type: props.type || 'default',
      label: props.label || props.prop!,
      width: props.width,
      minWidth: props.minWidth
    }
    context?.store.insertColumn(columnOptions)

    return {
      cssVars: cssVarsRef,
      tableColumnRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/table-column.scss';
</style>
