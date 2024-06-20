<template>
  <Teleport v-if="isRendered" :to="toWrapper">
    <div class="cl-drawer-container" :style="drawerContainerStyle" ref="drawerWrapperRef">
      <Transition v-if="showMask" name="fade-in-transition" :appear="isMountedRef">
        <div v-if="show" class="cl-drawer-mask" @click="handleMaskClick"></div>
      </Transition>

      <DrawerContentWrapper
        :class="drawerClass"
        :style="drawerContentStyle"
        v-bind="drawerContentProps"
        @update:width="(width) => $emit('update:width', width)"
        @update:height="(height) => $emit('update:height', height)"
      >
        <slot></slot>
      </DrawerContentWrapper>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref, onMounted } from 'vue'
import { drawerEmits, drawerProps } from './drawer'
import useTheme from '@/hooks/use-theme'
import { nextZIndex } from '@/utils/zIndex'
import { drawerLight } from '../styles/light'
import DrawerContentWrapper from './drawerContentWrapper.vue'

export default defineComponent({
  name: 'DrawerWrapper',
  props: drawerProps,
  components: {
    DrawerContentWrapper
  },
  emits: drawerEmits,
  setup(props, { emit, slots }) {
    const drawerWrapperRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()
    const isMountedRef = ref<boolean>(false)

    const themeRef = useTheme('drawer', drawerLight)

    const drawerContentProps = computed(() => ({
      blockScroll: props.blockScroll,
      show: props.show,
      placement: props.placement,
      resizable: props.resizable,
      to: toWrapper.value,
      isParentMounted: isMountedRef.value,
      onsize: () => {},
      onAfterEnter: props.onAfterEnter,
      onAfterLeave: props.onAfterLeave
    }))

    onMounted(() => {
      isMountedRef.value = true
    })

    const cssVarsRef = computed<CSSProperties>(() => {
      const {
        common: { cubicBezierEaseInOut, cubicBezierEaseIn, cubicBezierEaseOut },
        self: {
          color,
          textColor,
          boxShadow,
          enterDuration,
          leaveDuration,
          headerHorizantalPadding,
          headerVerticalPadding,
          bodyHorizantalPadding,
          bodyVerticalPadding,
          footerHorizantalPadding,
          footerVerticalPadding,
          drawerBorderRadius,
          titleFontSize,
          titleTextColor,
          titleFontWeight,
          headerBorderBottom,
          footerBorderTop,
          closeIconColor,
          closeIconColorHover,
          closeIconSize,
          resizableTriggerColorHover
        }
      } = themeRef.value
      return {
        '--cl-drawer-color': color,
        '--cl-drawer-text-color': textColor,
        '--cl-drawer-box-shadow': boxShadow,
        '--cl-drawer-bezier': cubicBezierEaseInOut,
        '--cl-drawer-bezier-out': cubicBezierEaseOut,
        '--cl-drawer-bezier-in': cubicBezierEaseIn,
        '--cl-drawer-enter-duration': enterDuration,
        '--cl-drawer-leave-duration': leaveDuration,
        '--cl-drawer-header-horizantal-padding': headerHorizantalPadding,
        '--cl-drawer-header-vertical-padding': headerVerticalPadding,
        '--cl-drawer-body-horizantal-padding': bodyHorizantalPadding,
        '--cl-drawer-body-vertical-padding': bodyVerticalPadding,
        '--cl-drawer-footer-horizantal-padding': footerHorizantalPadding,
        '--cl-drawer-footer-vertical-padding': footerVerticalPadding,
        '--cl-drawer-border-radius': drawerBorderRadius,
        '--cl-drawer-title-text-color': titleTextColor,
        '--cl-drawer-title-font-size': titleFontSize,
        '--cl-drawer-title-font-weight': titleFontWeight,
        '--cl-drawer-header-border-bottom': headerBorderBottom,
        '--cl-drawer-footer-border-top': footerBorderTop,
        '--cl-drawer-close-icon-color': closeIconColor,
        '--cl-drawer-close-icon-color-hover': closeIconColorHover,
        '--cl-drawer-close-icon-size': closeIconSize,
        '--cl-drawer-resize-trigger-color-hover': resizableTriggerColorHover
      }
    })
    const isRendered = computed(() => {
      return props.show || drawerWrapperRef.value
    })
    const toWrapper = computed(() => {
      return props.to === undefined ? 'body' : props.to
    })

    const drawerContainerStyle = computed<CSSProperties>(() => {
      const cssStyle = {
        ...cssVarsRef.value,
        zIndex: props.zIndex ?? nextZIndex()
      }
      return cssStyle
    })

    const widthOrHeightRef = computed(() => {
      const { width, height, placement } = props

      const style = {
        width: '',
        height: ''
      }
      if (placement === 'left' || placement === 'right') {
        const widthVal = width ? width : styleWidthSwitch()
        style.width = typeof widthVal === 'number' ? `${widthVal}px` : widthVal
      }
      if (placement === 'top' || placement === 'bottom') {
        const heightVal = height ? height : styleHeightSwitch()
        style.height = typeof heightVal === 'number' ? `${heightVal}px` : heightVal
      }
      return style
    })

    // 左右打开设置其宽度
    const styleWidthSwitch = () => {
      switch (props.size) {
        case 'small':
          return 320
        case 'large':
          return 560
        default:
          return 400
      }
    }
    // 上下打开设置其高度
    const styleHeightSwitch = () => {
      switch (props.size) {
        case 'small':
          return '40%'
        case 'large':
          return '80%'
        default:
          return '60%'
      }
    }

    const drawerContentStyle = computed(() => {
      return [
        {
          ...widthOrHeightRef.value
        },
        props.drawerStyle || ''
      ]
    })

    const handleMaskClick = (e: MouseEvent) => {
      const { maskClosable, onMaskClick } = props

      if (maskClosable) {
        emit('update:show', false)
      }
      if (onMaskClick) onMaskClick(e)
    }

    return {
      isRendered,
      toWrapper,
      isMountedRef,
      drawerContainerStyle,
      drawerWrapperRef,
      handleMaskClick,
      drawerContentStyle,
      drawerContentProps,
      title: props.title,
      closable: props.closable,
      headerStyle: props.headerStyle,
      bodyStyle: props.bodyStyle,
      footerStyle: props.footerStyle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/drawer.scss';
</style>
