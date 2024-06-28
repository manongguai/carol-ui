import type { PopupTrigger } from '@/components/popup/src/popup'
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

export const popConfirmEmits = {
  ['update:modelValue']: (val: boolean) => {},
  confirm: () => {},
  cancel: () => {}
}
export type PopConfirmEmits = typeof popConfirmEmits
export const popConfirmProps = {
  modelValue: {
    type: Boolean,
    default: false
  }, // 传入是否可见
  title: {
    type: String
  },
  content: {
    type: String
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  icon: {
    type: String,
    default: 'cl-icon-warning'
  },
  iconColor: {
    type: String,
    default: '#FE352D'
  },
  hideIcon: {
    type: Boolean,
    default: false
  },
  hideClose: {
    type: Boolean,
    default: false
  },
  hideConfirm: {
    type: Boolean,
    default: false
  },
  hideCancel: {
    type: Boolean,
    default: false
  },
  trigger: {
    type: String as PropType<PopupTrigger>,
    default: 'click'
  }, // 触发方式
  virtualRef: Object as PropType<ComponentPublicInstance<HTMLElement> | HTMLElement | null>,
  zIndex: Number
} as const
export type PopConfirmProps = ExtractPropTypes<typeof popConfirmProps>
