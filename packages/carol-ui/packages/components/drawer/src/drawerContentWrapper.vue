<template>
  <Transition
    :name="transitionName"
    :appear="isParentMounted"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <div v-if="show" :class="drawerClass" ref="drawerRef" :style="($attrs.style as StyleValue)">
      <div
        v-if="resizable"
        :class="resizableDrawerClass"
        @mouseenter="handleMouseenterResizeLine"
        @mousedown="handleMousedownResizeLine"
        @mouseleave="handleMouseleaveResizeLine"
      ></div>
      <div class="cl-drawer-content-wrapper">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import {
  type PropType,
  type Ref,
  type StyleValue,
  defineComponent,
  ref,
  computed,
  watch,
  onBeforeUnmount
} from 'vue'
import { type Placement } from './drawer'
import useLockHtmlScroll, { getScrollDom } from '@/hooks/use-lock-html-scroll'
import { onMove, getDom } from '@/utils'
export default defineComponent({
  name: 'DrawerContentWrapper',
  inheritAttrs: false,
  props: {
    blockScroll: Boolean,
    show: Boolean as PropType<boolean | undefined>,
    isParentMounted: Boolean,
    placement: String as PropType<Placement>,
    to: [String, Object] as PropType<string | HTMLElement>,
    resizable: Boolean,
    onAfterEnter: Function as PropType<() => void>,
    onAfterLeave: Function as PropType<() => void>
  },

  setup(props, { emit, attrs }) {
    // resizable相关
    let startPosition = 0
    let memoizedBodyStyleCursor = ''
    let hoverTimerId: number | null = null
    // 是否hover在resize line上面
    const isHoverOnResizeTriggerRef = ref(false)
    // 是否拖动中
    const isDraggingRef = ref(false)
    const drawerRef: Ref<HTMLElement | undefined> = ref()

    const transitionName = computed(() => {
      return (
        props.placement &&
        {
          right: 'slide-in-from-right',
          left: 'slide-in-from-left',
          top: 'slide-in-from-top',
          bottom: 'slide-in-from-bottom'
        }[props.placement]
      )
    })
    const drawerClass = computed(() => {
      let className = `cl-drawer cl-drawer--${props.placement}-placement`
      if (isDraggingRef.value) {
        className += ' cl-drawer--unselectable'
      }
      if (attrs.class) {
        className += ` ${attrs.class}`
      }
      return className
    })

    const resizableDrawerClass = computed(() => {
      let className = `cl-drawer__resize-trigger`
      if (isDraggingRef.value || isHoverOnResizeTriggerRef.value) {
        className += ' cl-drawer__resize-trigger--hover'
      }
      return className
    })

    const handleMouseenterResizeLine = (): void => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId)
        hoverTimerId = null
      }
      if (isDraggingRef.value) {
        isHoverOnResizeTriggerRef.value = true
      } else {
        hoverTimerId = window.setTimeout(() => {
          isHoverOnResizeTriggerRef.value = true
        }, 200)
      }
    }

    const isVertical = computed(() => {
      return props.placement === 'top' || props.placement === 'bottom'
    })

    // 鼠标在resize Line上面按下时触发的事件处理函数
    const handleMousedownResizeLine = (e: MouseEvent): void => {
      isDraggingRef.value = true
      startPosition = isVertical.value ? e.clientY : e.clientX
      memoizedBodyStyleCursor = getDom(props.to!)?.style.cursor!

      getDom(props.to!)!.style.cursor = isVertical.value ? 'ns-resize' : 'ew-resize'
      onMove(handleBodyMousemove, handleBodyMouseup)
    }
    // 鼠标从resize Line上面移出时触发的事件处理函数
    const handleMouseleaveResizeLine = (): void => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId)
        hoverTimerId = null
      }
      isHoverOnResizeTriggerRef.value = false
    }

    const handleBodyMouseup = (): void => {
      if (isDraggingRef.value) {
        startPosition = 0
        isDraggingRef.value = false
        isHoverOnResizeTriggerRef.value = false
        getDom(props.to!)!.style.cursor = memoizedBodyStyleCursor
      }
    }

    const handleBodyMousemove = (e: MouseEvent): void => {
      if (isDraggingRef.value) {
        const scrollContainer = getScrollDom(props.to!)
        if (isVertical.value) {
          let height = drawerRef.value?.offsetHeight || 0
          // 这里起始位置减去最终位置判断了一下方向，如果是bottom，想要尺寸变大，刚好起始位置 - 鼠标当前位置 > 0
          const increment = startPosition - e.clientY
          height += props.placement === 'bottom' ? increment : -increment
          const maxHeight = scrollContainer?.clientHeight || 0
          // 计算可以拖拽的高度范围
          height = Math.min(Math.max(1, height), maxHeight - 1)
          emit('update:height', height)
          startPosition = e.clientY
        } else {
          let width = drawerRef.value?.offsetWidth || 0
          const increment = startPosition - e.clientX
          width += props.placement === 'right' ? increment : -increment
          const maxWidth = scrollContainer?.clientWidth || 0
          // 计算可以拖拽的宽度范围
          width = Math.min(Math.max(1, width), maxWidth - 1)
          emit('update:width', width)
          startPosition = e.clientX
        }
      }
    }

    watch(
      () => props.show,
      (value) => {
        if (!value) {
          handleBodyMouseup()
        }
      }
    )

    onBeforeUnmount(() => {
      handleBodyMouseup()
    })
    useLockHtmlScroll(
      computed(() => {
        return props.blockScroll && props.show!
      }),
      props.to!
    )

    return {
      drawerRef,
      transitionName,
      drawerClass,
      resizableDrawerClass,
      handleMouseenterResizeLine,
      handleMousedownResizeLine,
      handleMouseleaveResizeLine
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/drawer.scss';
</style>
