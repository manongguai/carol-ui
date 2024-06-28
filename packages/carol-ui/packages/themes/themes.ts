import { type GlobalTheme } from '../components/config-provider/src/config-provider'

export type BuiltInGlobalTheme = Omit<
  Required<GlobalTheme>,
  'InternalSelectMenu' | 'InternalSelection'
>
