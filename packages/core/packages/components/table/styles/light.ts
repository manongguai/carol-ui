import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase,
    stripedBackgroundColor: '#f5f7fa'
  }
}

export type TableThemeVars = ReturnType<typeof self>

export const tableLight: Theme<'table', TableThemeVars> = {
  name: 'table',
  common: commonLight,
  self
}

export type TableTheme = typeof tableLight
