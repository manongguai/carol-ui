<template>
  <div class="cl-table">
    <slot></slot>
    <div class="cl-table__header-wrapper">
      <table>
        <table-header :columns="columns"></table-header>
      </table>
    </div>
    <div class="cl-table__body-wrapper">
      <table>
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
export default defineComponent({
  name: 'ClTable',
  props: tableProps,
  emits: tableEmits,
  components: {
    TableHeader,
    TableFooter,
    TableBody
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

    return {
      cssVars: cssVarsRef,
      tableRef,
      store,
      columns
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/table.scss';
</style>
