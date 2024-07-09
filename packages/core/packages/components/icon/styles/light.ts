import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type IconThemeVars = ReturnType<typeof self>

export const iconLight: Theme<'icon', IconThemeVars> = {
  name: 'icon',
  common: commonLight,
  self
}

export type IconTheme = typeof iconLight
