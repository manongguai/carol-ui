<template>
  <transition name="cl-notification-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :class="['cl-notification', customClass, horizontalClass]"
      :style="(cssVars as CSSProperties)"
      @mouseenter="() => clearTimer()"
      @mouseleave="() => startTimer()"
    >
      <cl-icon
        class="cl-notification__icon"
        v-if="type || iconName"
        :iconName="iconName || `cl-icon-${type}`"
        :color="cssVars[`--cl-icon-color`]?.toString()"
      ></cl-icon>
      <div :class="['cl-notification__group', type || iconName ? 'is-with-icon' : '']">
        <div class="cl-notification__title">
          <span class="">{{ title }}</span>
          <cl-icon
            class="cl-notification__closeBtn cl-icon-close"
            iconName="cl-icon-close"
            :color="cssVars['--cl-close-color']?.toString()"
            @click.stop="close"
            v-if="showClose"
          ></cl-icon>
        </div>
        <div
          :class="['cl-notification__content', title ? '' : 'is-no-title']"
          :style="{ maxHeight: contentHeight + 'px' }"
        >
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div class="cl-notification__footer">
          <slot name="footer">
            <p v-if="!dangerouslyUseHTMLString">{{ footerInfo }}</p>
            <p v-else v-html="footerInfo"></p>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { type CSSProperties, computed, onMounted, defineComponent, ref, type Ref } from 'vue'
import { notificationEmits, notificationProps } from './notification'
import useTheme from '@/hooks/use-theme'
import ClIcon from '@/components/icon'
import { createKey, nextZIndex } from '@kirkw/utils'
import { notificationLight } from '../styles/light'

export default defineComponent({
  name: 'ClNotification',
  props: notificationProps,
  emits: notificationEmits,
  components: {
    ClIcon
  },
  setup(props) {
    const notificationRef: Ref<HTMLElement | null> = ref<HTMLElement | null>(null)
    let timer: number | undefined
    const themeRef = useTheme('notification', notificationLight)
    const visible = ref(true)
    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme
      const { type } = props
      const {
        notificationWidth,
        notificationPadding,
        notificationBorderRadius,
        notificationBorderColor,
        backgroundColor,
        boxShadow,
        offsetPostion,
        titleSize,
        titleColor,
        contentSize,
        contentPadding,
        contentColor,
        closeColor,
        closeHoverColor
      } = self
      const mergedColor = self[createKey('color', type)]
      const colorProps = {
        '--cl-icon-color': mergedColor,
        '--cl-notification-border-color': notificationBorderColor,
        '--cl-notification-background-color': backgroundColor,
        '--cl-notification-title-color': titleColor,
        '--cl-notification-content-color': contentColor,
        '--cl-notification-close-color': closeColor,
        '--cl-notification-close-hover-color': closeHoverColor
      }
      const styleProps = {
        zIndex: props.zIndex ?? nextZIndex(),
        '--cl-notification-width': notificationWidth,
        '--cl-notification-padding': notificationPadding,
        '--cl-notification-border-radius': notificationBorderRadius,
        '--cl-notification-box-shadow': boxShadow,
        '--cl-notification-position': offsetPostion,
        '--cl-notification-title-size': titleSize,
        '--cl-notification-content-size': contentSize,
        '--cl-notification-content-padding': contentPadding
      }
      return {
        ...colorProps,
        ...styleProps
      }
    })
    onMounted(() => {
      startTimer()
    })
    const horizontalClass = computed(() => {
      return props.position.indexOf('right') > -1 ? 'is-right' : 'is-left'
    })

    const clearTimer = () => {
      clearTimeout(timer)
    }

    const close = () => {
      visible.value = false
      if (typeof props.beforeClose === 'function') {
        props.beforeClose()
      }
    }

    const startTimer = () => {
      if (props.duration > 0) {
        timer = window.setTimeout(() => {
          close()
        }, props.duration)
      }
    }

    return {
      cssVars: cssVarsRef,
      notificationRef,
      horizontalClass,
      clearTimer,
      startTimer,
      close,
      visible
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/notification.scss';
</style>
