import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  // useTheme 会接收全局合并后的mergedCommonVars进来
  const { textColorBase } = vars
  return {
    color: textColorBase,

    labelFontSizeLarge: vars.fontSizeMedium,
    labelFontSizeMedium: vars.fontSizeMedium,
    labelFontSizeSmall: vars.fontSizeSmall,

    marginBottomLarge: '22px',
    marginBottomMedium: '18px',
    marginBottomSmall: '18px'
  }
}

export type FormItemThemeVars = ReturnType<typeof self>

export const formItemLight: Theme<'formItem', FormItemThemeVars> = {
  name: 'formItem',
  common: commonLight,
  self
}

export type FormItemTheme = typeof formItemLight
