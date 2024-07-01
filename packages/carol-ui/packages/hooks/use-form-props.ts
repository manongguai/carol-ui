import { computed, inject, ref, unref } from 'vue'

import type { ComponentSize } from '@/constants/size'
import type { MaybeRef } from '@vueuse/core'
import { formInjectionKey } from '@/components/form/src/context'
import { formItemInjectionKey } from '@/components/form-item/src/context'
import { useProp } from './use-prop'

export const useFormSize = (
  fallback?: MaybeRef<ComponentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
) => {
  const emptyRef = ref(undefined)
  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size')
  const form = ignore.form ? { size: undefined } : inject(formInjectionKey, undefined)
  const formItem = ignore.formItem ? { size: undefined } : inject(formItemInjectionKey, undefined)
  return computed(
    (): ComponentSize => size.value || unref(fallback) || formItem?.size || form?.size || ''
  )
}
export const useFormDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')
  const form = inject(formInjectionKey, undefined)
  return computed(() => disabled.value || unref(fallback) || form?.disabled || false)
}

// These exports are used for preventing breaking changes
export const useSize = useFormSize
export const useDisabled = useFormDisabled
