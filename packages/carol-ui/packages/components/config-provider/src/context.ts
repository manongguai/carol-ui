import type { ConfigProviderInjection } from './config-provider'
import { createInjectionKey } from '@/utils'

const configProviderInjectionKey = createInjectionKey<ConfigProviderInjection>('cl-config-provider')

export default configProviderInjectionKey
