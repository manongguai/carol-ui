import { ref, type Ref } from 'vue'
import normalizeWheel from 'normalize-wheel-es'
import { type ScrollbarInstance } from '@/components/scrollbar'
export function useScroll() {
  const headerWrapperRef = ref<HTMLDivElement | undefined>()
  const scrollBarRef = ref<ScrollbarInstance | undefined>()

  function handleBodyScroll({ scrollLeft }: { scrollLeft: number }) {
    headerWrapperRef.value!.scrollLeft = scrollLeft
  }
  function handleHeaderFooterWheel(event: WheelEvent) {
    const { pixelX, pixelY } = normalizeWheel(event)
    if (Math.abs(pixelX) >= Math.abs(pixelY)) {
      scrollBarRef.value!.setScrollLeft((scrollBarRef.value!.wrapRef!.scrollLeft += pixelX))
    }
  }
  return {
    headerWrapperRef,
    handleBodyScroll,
    handleHeaderFooterWheel,
    scrollBarRef
  }
}
