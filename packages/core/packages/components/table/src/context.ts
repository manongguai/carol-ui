import { createInjectionKey } from '@kirkw/utils'
import type { TableInjection } from './table'

export const tableInjectionKey = createInjectionKey<TableInjection>('cl-table')
