import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
const commonVariables = {
  titleSize: '16px',
  descriptionFontSize: '12px',
  iconSize: '32px',
  iconIndexSize: '16px',
  iconIndexWidth: '28px',
  iconIndexHight: '28px',
  iconIndexRaduis: '50%',
  fontWeight: '500'
}
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase, primaryColorHover, infoColor, textColor4 } = vars
  return {
    color: textColorBase,
    titleColor: primaryColorHover,
    infoColor,
    textColor4,
    ...commonVariables
  }
}

export type StepThemeVars = ReturnType<typeof self>

export const stepLight: Theme<'step', StepThemeVars> = {
  name: 'step',
  common: commonLight,
  self
}

export type StepTheme = typeof stepLight
