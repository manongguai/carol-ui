import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type TableColumnThemeVars = ReturnType<typeof self>

export const tableColumnLight: Theme<'tableColumn', TableColumnThemeVars> = {
  name: 'tableColumn',
  common: commonLight,
  self
}

export type TableColumnTheme = typeof tableColumnLight
