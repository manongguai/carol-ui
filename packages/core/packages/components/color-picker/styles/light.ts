import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type ColorPickerThemeVars = ReturnType<typeof self>

export const colorPickerLight: Theme<'colorPicker', ColorPickerThemeVars> = {
  name: 'colorPicker',
  common: commonLight,
  self
}

export type ColorPickerTheme = typeof colorPickerLight
