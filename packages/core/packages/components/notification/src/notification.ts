import type { ExtractPropTypes, PropType, VNode } from 'vue'
export const notificationTypes = ['success', 'info', 'warning', 'error'] as const

export type Type = 'success' | 'info' | 'warning' | 'error'
export const notificationProps = {
  customClass: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3000
  },
  type: {
    type: String as PropType<Type>,
    default: ''
  },
  iconName: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: [String, Function] as PropType<string | (() => VNode)>,
    default: ''
  },
  footerInfo: {
    type: [String, Function] as PropType<string | (() => VNode)>,
    default: ''
  },
  offset: {
    type: Number,
    default: 0
  },
  position: {
    type: String,
    values: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    default: 'top-right'
  },
  showClose: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 2000
  },
  contentHeight: {
    type: Number,
    default: 70
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true
  },
  beforeClose: {
    type: Function as PropType<() => void>,
    required: true
  }
}
export type NotificationProps = ExtractPropTypes<typeof notificationProps>
export type NotificationParams = Partial<NotificationProps> | string | VNode

export type NotifyTypedFn = (options?: NotificationParams) => NotificationHandle

export interface NotificationHandle {
  close: () => void
}

export const notificationEmits = {
  destroy: () => true
}
export interface NotificationQueueItem {
  vm: VNode
}
export type NotificationQueue = NotificationQueueItem[]
