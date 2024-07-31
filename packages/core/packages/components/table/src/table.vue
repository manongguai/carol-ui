<template>
  <div class="cl-table" ref="tableWrapperRef" :style="cssVars">
    <div class="cl-table__inner-wrapper" :style="tableInnerStyle">
      <slot></slot>
      <div
        ref="headerWrapperRef"
        class="cl-table__header-wrapper"
        @mousewheel="handleHeaderFooterWheel"
        v-if="showHeader && tableLayout === 'fixed'"
      >
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
      <div ref="bodyWrapperRef" class="cl-table__body-wrapper">
        <cl-scrollbar
          ref="scrollBarRef"
          :view-style="{ display: 'inline-block', verticalAlign: 'middle' }"
          :wrap-style="scrollbarStyle"
          :always="scrollbarAlwaysOn"
          @scroll="handleBodyScroll"
        >
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            ref="bodyRef"
            class="cl-table__body"
            :style="tableBodyStyles"
          >
            <hColgroup :columns="columns" :tableLayout="tableLayout"></hColgroup>
            <table-header v-if="showHeader && tableLayout === 'auto'" ref="tableHeaderRef" />
            <table-body></table-body>
          </table>
        </cl-scrollbar>
      </div>
      <div class="cl-table__footer-wrapper" ref="footerWrapperRef">
        <table-footer></table-footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type Ref, provide } from 'vue'
import { tableEmits, tableProps } from './table'
import TableBody from './table-body.vue'
import TableHeader from './table-header.vue'
import TableFooter from './table-footer.vue'
import { useStore } from './store'
import { tableInjectionKey } from './context'
import { hColgroup } from './h-helper'
import ClScrollbar from '@/components/scrollbar'
import { useScroll } from './hooks/useScroll'
import { useStyle } from './hooks/useStyle'
export default defineComponent({
  name: 'ClTable',
  props: tableProps,
  emits: tableEmits,
  components: {
    TableHeader,
    TableFooter,
    TableBody,
    ClScrollbar,
    hColgroup
  },
  setup(props, { emit }) {
    const bodyRef = ref<HTMLTableElement | undefined>()
    const bodyWrapperRef = ref<HTMLDivElement | undefined>()
    const tableWrapperRef = ref<HTMLDivElement | undefined>()
    const tableHeaderRef = ref<HTMLDivElement | undefined>()
    const tableHeader = ref<HTMLTableElement | undefined>()
    const footerWrapperRef = ref<HTMLDivElement | undefined>()
    const { cssVarsRef, tableInnerStyle, scrollbarStyle, tableBodyStyles } = useStyle(props)
    const store = useStore()
    const columns = computed(() => {
      return store.columns
    })
    provide(tableInjectionKey, {
      ...props,
      store
    })

    const { scrollBarRef, headerWrapperRef, handleBodyScroll, handleHeaderFooterWheel } =
      useScroll()
    return {
      cssVars: cssVarsRef,
      bodyRef,
      store,
      columns,
      tableBodyStyles,
      handleBodyScroll,
      handleHeaderFooterWheel,
      tableHeader,
      headerWrapperRef,
      bodyWrapperRef,
      tableHeaderRef,
      tableWrapperRef,
      footerWrapperRef,
      scrollBarRef,
      tableInnerStyle,
      scrollbarStyle
    }
  }
})
</script>

<style lang="scss">
@import '../styles/table.scss';
</style>
