import type { FormContext } from '@/types/form'
import { createInjectionKey } from '@kirkw/utils'

export const formInjectionKey = createInjectionKey<FormContext>('cl-form')
