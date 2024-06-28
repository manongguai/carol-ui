import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type Popup from './popup.vue'
export type PopupTrigger = 'click' | 'hover' | 'manual'
export type PopupEffect = 'dark' | 'light'
export type PopupPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'left-start'
  | 'left-center'
  | 'left-end'
  | 'right-start'
  | 'right-center'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

export const popupProps = {
  modelValue: {
    type: Boolean,
    default: false
  }, // 传入是否可见
  disabled: {
    type: Boolean,
    default: false
  },
  preRender: {
    type: Boolean,
    default: false
  }, // 预渲染
  trigger: {
    type: String as PropType<PopupTrigger>,
    default: 'hover'
  }, // 触发方式
  content: String,
  txtOverLine: {
    type: Number,
    default: 0
  },
  /* txtOverLine < 1 不限制多行截断提示，直接显示气泡
    限制多行截断提示，超出才显示泡 */
  effect: {
    type: String as PropType<PopupEffect>,
    default: 'light'
  }, // 风格主题： 黑 / 白
  placement: {
    type: String as PropType<PopupPlacement>,
    default: 'top-center'
  }, // 气泡出现位置
  openDelay: {
    default: 100,
    type: Number
  }, // 延迟出现，单位毫秒
  closeDelay: {
    default: 100,
    type: Number
  }, // 延迟隐藏，单位毫秒
  enterable: {
    default: true,
    type: Boolean
  }, // 鼠标是否可进入到泡中
  popupClass: String, // 自定义pop样式
  offset: {
    default: 0,
    type: Number
  }, // 泡偏移量px
  visibleArrow: {
    default: true,
    type: Boolean
  }, // 是否显示箭头
  arrowOffset: {
    default: 0,
    type: Number
  }, // 箭头偏移
  virtualRef: Object as PropType<ComponentPublicInstance<HTMLElement> | HTMLElement | null>,
  zIndex: Number,
  animated: {
    default: true,
    type: Boolean
  },
  outsideAutoCloseWithManual: {
    default: false,
    type: Boolean
  }
} as const
export type PopupProps = ExtractPropTypes<typeof popupProps>

export type PopupInstance = InstanceType<typeof Popup>

export const popupEmits = {
  ['update:modelValue']: (val: boolean): void => {}
}
export type PopupEmits = typeof popupEmits
