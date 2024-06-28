import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type ColThemeVars = ReturnType<typeof self>

export const colLight: Theme<'col', ColThemeVars> = {
  name: 'col',
  common: commonLight,
  self
}

export type ColTheme = typeof colLight
