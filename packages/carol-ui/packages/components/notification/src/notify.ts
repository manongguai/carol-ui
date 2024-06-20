import { createVNode, render } from 'vue'
import Notification from './notification.vue'
import { notificationTypes } from './notification'
import { isVNode } from '@/utils/common'
import type { NotificationProps, NotificationQueue } from './notification'

let seed = 1
const GAP_SIZE = 16
const instances = new Map<string, any>()
const notifications: Record<NotificationProps['position'], NotificationQueue> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': []
}
// 定义 ClNotification 函数
function ClNotification(options: NotificationProps) {
  // 生成通知的唯一 ID
  const id = 'notification_' + seed++

  // 创建一个新的 div 容器
  const container = document.createElement('div')
  // 设置通知的位置和偏移量
  const positionClass = options.position || 'top-right'
  let verticalOffset = options.offset || 0
  // 存储用户自定义的 onClose 函数
  const userOnClose = options.onClose
  // 用自定义的 onClose 函数覆盖 options.onClose
  const props: Partial<NotificationProps> = {
    // zIndex: nextZIndex(), // 等着全局的z-index规则
    ...options,
    id,
    position: positionClass,
    onClose: () => {
      ClNotification.close(id, userOnClose)
    }
  }
  // 创建一个一个Vue组件实例
  const message = isVNode(options.message)
    ? {
        default: () => options.message
      }
    : null
  const footerInfo = isVNode(options.footerInfo)
    ? {
        footer: () => options.footerInfo
      }
    : null
  const slots = {
    ...(message || {}),
    ...(footerInfo || {})
  }
  const componentInstance = createVNode(Notification, props, slots)
  // 使用 render 函数将 Vue 组件实例渲染到容器中
  render(componentInstance, container)
  // 关闭触发destroy函数
  componentInstance.props!.onDestroy = () => {
    render(null, container)
  }
  // 计算当前位置的所有通知的总高度
  notifications[positionClass].forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE
  })
  // 添加间隙
  verticalOffset += GAP_SIZE
  // 获取通知元素并添加位置类
  const notificationElement = container.firstElementChild as HTMLElement
  notificationElement.classList.add(positionClass)
  // 设置通知元素的位置
  switch (positionClass) {
    case 'top-left':
    case 'top-right':
      notificationElement.style.top = `${verticalOffset}px`
      break
    case 'bottom-left':
    case 'bottom-right':
      notificationElement.style.bottom = `${verticalOffset}px`
      break
  }
  // 将通知元素添加到文档中
  document.body.appendChild(notificationElement)
  // 将通知实例添加到 instances 中
  instances.set(id, componentInstance)
  // 将 Vue 组件实例添加到 notifications 中
  notifications[positionClass].push({ vm: componentInstance })
}

ClNotification.close = function (id: string, userOnClose?: () => void) {
  const instance = instances.get(id)
  if (!instance) return
  if (typeof userOnClose === 'function') {
    userOnClose()
  }
  instances.delete(id)
  const positionClass = instance.props.position
  // 更新通知列表和偏移量
  const index = notifications[positionClass].findIndex(({ vm }) => vm === instance)
  if (index !== -1) {
    notifications[positionClass].splice(index, 1)
    let verticalOffset = 0
    notifications[positionClass].forEach(({ vm }) => {
      if (vm.el) {
        vm.el.style[positionClass.includes('top') ? 'top' : 'bottom'] = `${verticalOffset}px`
        verticalOffset += (vm.el.offsetHeight || 0) + GAP_SIZE
      }
    })
  }
}

ClNotification.closeAll = function () {
  instances.forEach((_, id) => {
    ClNotification.close(id)
  })
}

notificationTypes.forEach((type) => {
  ;(ClNotification as any)[type] = (options: NotificationProps) => {
    return ClNotification({
      ...options,
      type
    })
  }
})

export default ClNotification
