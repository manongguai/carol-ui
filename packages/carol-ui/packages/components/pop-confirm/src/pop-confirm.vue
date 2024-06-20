<template>
  <cl-popup
    v-bind="$attrs"
    v-model="visible"
    :trigger="trigger"
    effect="light"
    :txtOverLine="0"
    popupClass="cl-pop-confirm"
    :virtualRef="virtualRef"
    :style="cssVars"
  >
    <template #content>
      <div class="cl-pop-confirm__title">
        <cl-icon v-if="!hideIcon" class="cl-pop-confirm__icon" :iconName="icon" :color="iconColor">
        </cl-icon>
        <slot name="title">{{ title }}</slot>
        <cl-icon v-if="!hideClose" iconName="cl-icon-close" class="cl-icon-close" @click="cancel">
        </cl-icon>
      </div>

      <div
        v-if="content || $slots.content"
        class=""
        :class="['cl-pop-confirm__content', content && 'simple-content']"
      >
        <slot name="content">{{ content }}</slot>
      </div>

      <!-- 底部操作按钮 -->
      <div v-if="!hideConfirm || !hideCancel" class="cl-pop-confirm_action">
        <slot name="footer">
          <span v-if="!hideCancel" class="btn-cancel" @click="cancel">{{ cancelText }}</span>
          <span v-if="!hideConfirm" class="btn-confirm" @click="confirm">{{ confirmText }}</span>
        </slot>
      </div>
      <!--  -->
    </template>
    <template #reference v-if="!virtualRef">
      <slot name="reference"></slot>
    </template>
  </cl-popup>
</template>

<script lang="ts">
import { type CSSProperties, computed, defineComponent, ref, type Ref, watch, nextTick } from 'vue'
import { popConfirmEmits, popConfirmProps } from './pop-confirm'
import useTheme from '@/hooks/use-theme'
import { popConfirmLight } from '../styles/light'
import ClPopup from '@/components/popup'
import ClIcon from '@/components/icon'
export default defineComponent({
  name: 'ClPopConfirm',
  component: [ClPopup, ClIcon],
  props: popConfirmProps,
  emits: popConfirmEmits,
  setup(props, { emit }) {
    const popConfirmRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()
    const visible = ref<boolean>(false)
    const themeRef = useTheme('popConfirm', popConfirmLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme
      return {
        '--cl-pop-confirm-title-icon-space': self['titleIconSpace'],
        '--cl-pop-confirm-title-font-size': self['titleFontSize'],
        '--cl-pop-confirm-title-font-weight': self['titleFontWeight'],
        '--cl-pop-confirm-title-color': self['titleColor'],
        '--cl-pop-confirm-title-margin-bottom': self['titleMarginBottom'],
        '--cl-pop-confirm-content-margin-bottom': self['contentMarginBottom'],
        '--cl-pop-confirm-content-padding': self['contentPadding'],
        '--cl-pop-confirm-content-color': self['contentColor'],
        '--cl-pop-confirm-action-margin-top': self['actionMarginTop']
      }
    })
    watch(visible, (val) => {
      emit('update:modelValue', val) // 内部可见状态反馈到外部
    })
    function confirm() {
      visible.value = false
      emit('confirm')
    }
    function cancel() {
      visible.value = false
      emit('cancel')
    }
    watch(
      () => props.modelValue,
      (val) => {
        nextTick(() => {
          visible.value = val // 外部可见状态同步内部
        })
      },
      {
        immediate: true
      }
    )
    return {
      cssVars: cssVarsRef,
      popConfirmRef,
      confirm,
      cancel,
      visible
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/pop-confirm.scss';
</style>
