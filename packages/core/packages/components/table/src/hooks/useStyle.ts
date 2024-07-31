import useTheme from '@/hooks/use-theme'
import {
  computed,
  getCurrentInstance,
  onMounted,
  ref,
  type ComponentInternalInstance,
  type CSSProperties,
  type VNode
} from 'vue'
import { tableLight } from '../../styles'
import { getSizeByNumberOrString } from '@kirkw/utils'
import type { TableProps } from '../table'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import type { ScrollbarInstance } from '@/components/scrollbar'

export function useStyle(props: TableProps) {
  const table = getCurrentInstance() as ComponentInternalInstance & {
    $ready: boolean
  }
  const tableScrollHeight = ref(0)
  const bodyScrollHeight = ref(0)
  const headerScrollHeight = ref(0)
  const footerScrollHeight = ref(0)
  const appendScrollHeight = ref(0)

  const cssVarsRef = computed<CSSProperties>(() => {
    const themeRef = useTheme('table', tableLight)
    const theme = themeRef.value
    const { self } = theme
    const colorProps = {
      '--cl-table-row-striped-background-color': self.stripedBackgroundColor
    }
    const sizeStyle: Record<string, any> = {}
    if (props.width) {
      sizeStyle.width = getSizeByNumberOrString(props.width)
    }
    if (props.height) {
      sizeStyle.height = getSizeByNumberOrString(props.height)
    }
    if (props.maxHeight) {
      sizeStyle.maxHeight = getSizeByNumberOrString(props.maxHeight)
    }
    return {
      ...colorProps,
      ...sizeStyle
    }
  })
  const tableInnerStyle = computed<CSSProperties>(() => {
    if (props.height) {
      return {
        height: getSizeByNumberOrString(props.height)
      }
    }
    if (props.maxHeight) {
      return {
        maxHeight: getSizeByNumberOrString(props.maxHeight)
      }
    }
    return {}
  })
  const scrollbarStyle = computed(() => {
    if (props.height) {
      return {
        height: '100%'
      }
    }
    if (props.maxHeight) {
      if (!Number.isNaN(Number(props.maxHeight))) {
        return {
          maxHeight: `${
            (props.maxHeight as number) - headerScrollHeight.value - footerScrollHeight.value
          }px`
        }
      } else {
        return {
          maxHeight: `calc(${props.maxHeight} - ${
            headerScrollHeight.value + footerScrollHeight.value
          }px)`
        }
      }
    }
    return {}
  })
  const tableBodyStyles = computed(() => {
    return {
      'table-layout': props.tableLayout,
      width: '100%'
    }
  })

  const bindEvents = () => {
    if (!table?.refs.scrollBarRef) return
    console.log(table, 111)

    useResizeObserver(table.vnode.el as HTMLElement, resizeListener)

    useResizeObserver(table.refs.bodyWrapper as HTMLDivElement, () => {
      resizeListener()
      ;(table.refs?.scrollBarRef as ScrollbarInstance)?.update()
    })
  }

  const resizeListener = () => {
    const el = table?.vnode.el
    console.log(table?.$ready)
    if (!table?.$ready || !el) return
    const tableHeader: HTMLElement =
      props.tableLayout === 'fixed'
        ? (table.refs.headerWrapperRef as HTMLDivElement)
        : (table.refs.tableHeaderRef as HTMLDivElement)

    tableScrollHeight.value = (table.refs.tableWrapperRef as HTMLDivElement)?.scrollHeight || 0
    headerScrollHeight.value = tableHeader?.scrollHeight || 0
    footerScrollHeight.value = (table.refs.footerWrapperRef as HTMLDivElement)?.offsetHeight || 0
  }

  onMounted(() => {
    bindEvents()
    table!.$ready = true
  })

  return { cssVarsRef, tableInnerStyle, scrollbarStyle, tableBodyStyles }
}
