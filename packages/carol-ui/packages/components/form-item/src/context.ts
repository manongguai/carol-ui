import { createInjectionKey } from '@kirkw/utils'
import type { FormItemContext } from '@/types/form'

export const formItemInjectionKey = createInjectionKey<FormItemContext>('cl-form-item')
