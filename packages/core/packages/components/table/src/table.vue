<template>
  <div class="cl-table">
    <slot></slot>
    <div class="cl-table__header-wrapper" v-if="showHeader && tableLayout === 'fixed'">
      <table
        cellspacing="0"
        cellpadding="0"
        border="0"
        ref="tableHeader"
        class="cl-table__header"
        :style="tableBodyStyles"
      >
        <hColgroup :columns="columns" :tableLayout="tableLayout"></hColgroup>
        <table-header></table-header>
      </table>
    </div>
    <div class="cl-table__body-wrapper">
      <table
        cellspacing="0"
        cellpadding="0"
        border="0"
        ref="tableBody"
        class="cl-table__body"
        :style="tableBodyStyles"
      >
        <hColgroup :columns="columns" :tableLayout="tableLayout"></hColgroup>
        <table-header v-if="showHeader && tableLayout === 'auto'" ref="tableHeaderRef" />
        <table-body></table-body>
      </table>
    </div>
    <div class="cl-table__footer-wrapper">
      <table-footer></table-footer>
    </div>
  </div>
</template>

<script lang="ts">
import {
  type CSSProperties,
  computed,
  defineComponent,
  ref,
  type Ref,
  getCurrentInstance,
  provide
} from 'vue'
import { tableEmits, tableProps } from './table'
import useTheme from '@/hooks/use-theme'
import { tableLight } from '../styles/light'
import TableBody from './table-body.vue'
import TableHeader from './table-header.vue'
import TableFooter from './table-footer.vue'
import { useStore } from './store'
import { tableInjectionKey } from './context'
import { hColgroup } from './h-helper'
export default defineComponent({
  name: 'ClTable',
  props: tableProps,
  emits: tableEmits,
  components: {
    TableHeader,
    TableFooter,
    TableBody,
    hColgroup
  },
  setup(props, { emit }) {
    const tableRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()
    const themeRef = useTheme('table', tableLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme

      return {}
    })

    const store = useStore()
    const columns = computed(() => {
      return store.columns
    })
    provide(tableInjectionKey, {
      store: store
    })

    const tableBodyStyles = computed(() => {
      return {
        'table-layout': props.tableLayout,
        width: '100%'
      }
    })
    return {
      cssVars: cssVarsRef,
      tableRef,
      store,
      columns,
      tableBodyStyles
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/table.scss';
</style>
