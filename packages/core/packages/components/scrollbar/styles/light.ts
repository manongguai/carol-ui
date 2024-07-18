import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type ScrollbarThemeVars = ReturnType<typeof self>

export const scrollbarLight: Theme<'scrollbar', ScrollbarThemeVars> = {
  name: 'scrollbar',
  common: commonLight,
  self
}

export type ScrollbarTheme = typeof scrollbarLight
