import { createInjectionKey } from '@kirkw/utils'
import type { RowInjection } from './row'

export const rowInjectionKey = createInjectionKey<RowInjection>('cl-row')
