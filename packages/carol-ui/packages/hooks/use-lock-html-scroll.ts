import { onBeforeUnmount, onMounted, type WatchStopHandle, type Ref, watch } from 'vue'
import { getDom } from '@kirkw/utils'

let lockCount = 0
let originalMarginRight: string = ''
let originalOverflow: string = ''
let originalOverflowX: string = ''
let originalOverflowY: string = ''

export default function useLockHtmlScroll(
  lockRef: Ref<boolean>,
  element: string | HTMLElement
): void {
  // not browser
  if (typeof document === 'undefined') return
  const el = getScrollDom(element)
  let watchStopHandle: WatchStopHandle | undefined
  let activated = false
  const unlock = (): void => {
    el.style.marginRight = originalMarginRight
    el.style.overflow = originalOverflow
    el.style.overflowX = originalOverflowX
    el.style.overflowY = originalOverflowY
  }
  onMounted(() => {
    watchStopHandle = watch(
      lockRef,
      (value: boolean) => {
        if (value) {
          if (!lockCount) {
            if (el === document.documentElement) {
              const scrollbarWidth = window.innerWidth - el.offsetWidth
              if (scrollbarWidth > 0) {
                originalMarginRight = el.style.marginRight
                el.style.marginRight = `${scrollbarWidth}px`
              }
            }

            // 记录原始的滚动条样式， 然后隐藏滚动条
            originalOverflow = el.style.overflow
            originalOverflowX = el.style.overflowX
            originalOverflowY = el.style.overflowY
            el.style.overflow = 'hidden'
            el.style.overflowX = 'hidden'
            el.style.overflowY = 'hidden'
          }
          activated = true
          lockCount++
        } else {
          lockCount--
          if (!lockCount) {
            unlock()
          }
          activated = false
        }
      },
      {
        immediate: true
      }
    )
  })
  onBeforeUnmount(() => {
    watchStopHandle?.()
    if (activated) {
      lockCount--
      if (!lockCount) {
        unlock()
      }
      activated = false
    }
  })
}

/** 如果是在body中打开抽屉，这里获取到的是文档根元素html，如果是在某个容器里面打开抽屉，这里获取到的是该容器 */
export function getScrollDom(to: string | HTMLElement): HTMLElement {
  const dom = getDom(to)
  if (!dom || dom === document.body) {
    return document.documentElement
  } else {
    return dom
  }
}
