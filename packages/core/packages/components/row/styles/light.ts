import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type RowThemeVars = ReturnType<typeof self>

export const rowLight: Theme<'row', RowThemeVars> = {
  name: 'row',
  common: commonLight,
  self
}

export type RowTheme = typeof rowLight
