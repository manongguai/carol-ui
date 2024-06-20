import type { PropType, CSSProperties, ExtractPublicPropTypes } from 'vue'

export type Placement = 'left' | 'right' | 'top' | 'bottom'
export type Size = 'small' | 'default' | 'large'

export const drawerProps = {
  show: {
    type: Boolean
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'right'
  },
  width: [Number, String] as PropType<string | number>,
  height: [Number, String] as PropType<string | number>,
  size: {
    type: String as PropType<Size>,
    default: 'default'
  },
  zIndex: Number,
  blockScroll: {
    type: Boolean,
    default: true
  },
  resizable: Boolean,
  to: [String, Object] as PropType<string | HTMLElement>,
  showMask: {
    type: [Boolean, String] as PropType<boolean>,
    default: true
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  onMaskClick: Function as PropType<(e: MouseEvent) => void>,
  drawerStyle: [String, Object] as PropType<string | CSSProperties>,
  drawerClass: String,
  // 抽屉打开后的回调
  onAfterEnter: Function as PropType<() => void>,
  // 抽屉关闭后的回调
  onAfterLeave: Function as PropType<() => void>,

  title: String,
  closable: {
    type: Boolean,
    default: true
  },
  headerStyle: [String, Object] as PropType<string | CSSProperties>,
  bodyStyle: [String, Object] as PropType<string | CSSProperties>,
  footerStyle: [String, Object] as PropType<string | CSSProperties>
}

export type DrawerProps = ExtractPublicPropTypes<typeof drawerProps>
export const drawerEmits = {}
