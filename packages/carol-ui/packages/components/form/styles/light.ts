import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type FormThemeVars = ReturnType<typeof self>

export const formLight: Theme<'form', FormThemeVars> = {
  name: 'form',
  common: commonLight,
  self
}

export type FormTheme = typeof formLight
