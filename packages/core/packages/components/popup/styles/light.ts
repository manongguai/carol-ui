import type { Theme } from '@/hooks/use-theme'
import commonLight from '@/styles/light'
import type { ThemeCommonVars } from '@/styles'

const commonVariables = {
  padding: '8px',
  lineHeight: '16px',
  borderRadius: '4px',
  border: '1px solid #d4d7dc',
  arrowSpace: '3px', // arrow与reference的距离
  arrowWidth: '6px',
  arrowHeight: '6px',
  opacityLight: 1,
  boxShadowLight: '0 2px 5px 1px rgba(180, 187, 231, 0.5)',
  backgroundColorLight: '#FFFFFF',
  arrowBorderColorLight: '#d4d7dc',
  opacityDark: 0.8,
  colorDark: '#fff',
  boxShadowDark: '0 2px 6px 1px #d4d7dc',
  backgroundColorDark: '#222b3c',
  arrowBorderColorDark: 'transparent',
  arrowBackgroundColorDark: '#222b3c'
}
export const self = (vars: ThemeCommonVars) => {
  const { baseColor, infoColor, fontWeightStrong, fontSize } = vars
  return {
    ...commonVariables,
    backgroundColorLight: baseColor,
    arrowBackgroundColorLight: baseColor,
    colorLight: infoColor,
    fontWeight: fontWeightStrong,
    fontSize: fontSize
  }
}
export type PopupThemeVars = ReturnType<typeof self>
export const popupLight: Theme<'popup', PopupThemeVars> = {
  name: 'popup',
  common: commonLight,
  self
}

export type PopupTheme = typeof popupLight
