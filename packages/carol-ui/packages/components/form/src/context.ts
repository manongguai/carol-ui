import { createInjectionKey } from '@kirkw/utils'
import type { FormContext } from './form'

export const formInjectionKey = createInjectionKey<FormContext>('cl-form')
