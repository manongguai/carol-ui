import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type FormItemThemeVars = ReturnType<typeof self>

export const formItemLight: Theme<'formItem', FormItemThemeVars> = {
  name: 'formItem',
  common: commonLight,
  self
}

export type FormItemTheme = typeof formItemLight
