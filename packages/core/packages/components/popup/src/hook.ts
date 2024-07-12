import { ref, nextTick } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'
import type { PopupProps } from './popup'
import { Popper } from './popper'
import { useZIndex } from '@/hooks/use-zindex'
export function usePopper(
  popRef: Ref<HTMLElement | undefined>,
  referenceSlotEl: Ref<HTMLElement | null>,
  props: PopupProps,
  visible: Ref<boolean>
) {
  const { nextZIndex } = useZIndex()
  const hasInitPop = ref<boolean>(false)
  const popJs = ref<Popper | null>(null)
  const timer = ref<number | null>(null)
  function initPop() {
    if (judgeReferenceTxtOver() && !props.disabled) {
      hasInitPop.value = true
      // dom刚创建就获取，获取不到，故加nextTick
      nextTick(() => {
        newPopJS()
      })
    }
  }
  function destoryPop() {
    if (popJs.value) {
      popJs.value.destroy() // 销毁该实例，并删除附加在popper上的定位样式
      popJs.value = null
    }
  }
  function getReferenceEl(): HTMLElement | null {
    if (props.virtualRef) {
      // virtualRef 有可能是自定义组件，也可能是 原生dom
      return (
        (<ComponentPublicInstance<HTMLElement>>props.virtualRef).$el ||
        <HTMLElement>props.virtualRef
      )
    }
    return referenceSlotEl.value
    // 没有children说明是text节点，直接取父节点
  }
  /**
   * txtOverLine < 1 不限制多行截断提示，直接显示泡
   * 限制多行截断提示，超出才显示泡
   */
  function judgeReferenceTxtOver(): boolean {
    const el = getReferenceEl()
    if (!el) return false
    const isOver = el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight
    return !!(!props.txtOverLine || (props.txtOverLine && isOver))
  }
  function newPopJS() {
    const referenceEl = getReferenceEl()
    if (!popRef.value || !referenceEl) return
    document.body.appendChild(popRef.value)
    const options = {
      arrowOffset: props.arrowOffset,
      offset: props.offset,
      placement: props.placement
    }
    popJs.value = new Popper(referenceEl, popRef.value, options)
    // popJS定位完成后触发
    popJs.value.onCreate(() => {
      // 此时再去更新你想更新的信息，防止极限时间点
      nextTick(() => {
        popJs.value?.update()
        // popJs.value!._popper.style.zIndex = nextZIndex()
        const zIndex = props.zIndex ? props.zIndex : nextZIndex()
        popJs.value!._popper.style.zIndex = zIndex + ''
      })
    })
  }

  function addPopEvent() {
    if (!props.disabled && props.trigger === 'hover' && props.enterable) {
      nextTick(() => {
        if (popRef.value) {
          popRef.value.addEventListener('mouseenter', handleMouseEnter)
          popRef.value.addEventListener('mouseleave', handleMouseLeave)
        }
      })
    }
  }
  /** 触发方式为hover时，鼠标进入，显示泡 */
  function handleMouseEnter() {
    timer.value && clearTimeout(timer.value)
    timer.value = window.setTimeout(() => {
      visible.value = true
    }, props.openDelay)
  }
  /** 触发方式为hover时，鼠标离开，隐藏泡 */
  function handleMouseLeave() {
    timer.value && clearTimeout(timer.value)
    timer.value = window.setTimeout(() => {
      visible.value = false
    }, props.closeDelay)
  }
  function removeTriggerEvent() {
    const referenceEl = getReferenceEl()
    popRef.value?.removeEventListener('mouseenter', handleMouseEnter)
    popRef.value?.removeEventListener('mouseleave', handleMouseLeave)
    if (referenceEl) {
      referenceEl?.removeEventListener('mouseenter', handleMouseEnter)
      referenceEl?.removeEventListener('mouseleave', handleMouseLeave)
      referenceEl?.removeEventListener('click', doToggle)
    }
    document.removeEventListener('click', handleDocumentClick)
  }
  function handleDocumentClick(e: MouseEvent) {
    /**
     * 点击的元素不是popRef，也不是referenceEl
     * 隐藏pop
     */
    if (!visible.value) return
    const referenceEl = getReferenceEl()
    if (!popRef.value?.contains(e.target as Node) && !referenceEl?.contains(e.target as Node)) {
      visible.value = false
    }
  }
  function doToggle() {
    visible.value = !visible.value
  }
  function addTriggerEvent() {
    const referenceEl = getReferenceEl()
    if (!referenceEl) return
    switch (props.trigger) {
      /**
       * reference 鼠标enter 显示泡
       * reference 鼠标leave 隐藏泡
       */
      case 'hover':
        referenceEl.addEventListener('mouseenter', handleMouseEnter)
        referenceEl.addEventListener('mouseleave', handleMouseLeave)
        break

      /**
       * 点击reference 切换泡 显示 隐藏
       * 点击popup其他区域 隐藏泡
       */
      case 'click':
        referenceEl.addEventListener('click', doToggle)
        document.addEventListener('click', handleDocumentClick, true)
        break

      /** manual手动模式，事件由外部添加，移除内部 */
      case 'manual':
        removeTriggerEvent()
        if (props.outsideAutoCloseWithManual) {
          document.addEventListener('click', handleDocumentClick, true)
        }
    }
  }
  function addReferenceClass() {
    if (props.txtOverLine) {
      const referenceEl = getReferenceEl()
      if (referenceEl) {
        referenceEl.className = referenceEl.className + ' cl-popup-txt-over-line'
        const line_clamp = `-webkit-line-clamp: ${props.txtOverLine};`
        referenceEl.setAttribute('style', `${referenceEl.getAttribute('style')};${line_clamp}`)
      }
    }
  }
  return {
    hasInitPop,
    initPop,
    getReferenceEl,
    destoryPop,
    addPopEvent,
    removeTriggerEvent,
    addTriggerEvent,
    addReferenceClass
  }
}
