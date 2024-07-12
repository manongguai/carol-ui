import { isNumber } from '@kirkw/utils'
import { computed, inject, ref, unref } from 'vue'

import type { InjectionKey, Ref } from 'vue'

const zIndex = ref(0)
export let defaultInitialZIndex = 2000

export const zIndexContextKey: InjectionKey<Ref<number | undefined>> = Symbol('zIndexContextKey')

export const useZIndex = (zIndexOverrides?: Ref<number>) => {
  const zIndexInjection = zIndexOverrides
  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection)
    return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex
  })
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  }
}

export type UseZIndexReturn = ReturnType<typeof useZIndex>

export function setZIndex(index: number) {
  defaultInitialZIndex = index
}
