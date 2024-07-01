import { createInjectionKey } from '@kirkw/utils'
import type { FormInjection } from './form'

export const formInjectionKey = createInjectionKey<FormInjection>('cl-form')
