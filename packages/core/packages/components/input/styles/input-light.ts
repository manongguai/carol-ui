import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'

// 抽取常量
const inputSpecificVariables = {
  backgroundColorDisabled: '#f3f4f7',
  clearColor: '#C4C9D5',
  clearHoverColor: '#84879A',
  inputPadding: '8px', // 抽取inputPadding
  clearPaddingRight: '3px', // 抽取clearPaddingRight
  controlsPadding: '33px',
  controlsWidth: '32px',
  innerPadding: '38px'
}

export const self = (vars: ThemeCommonVars) => {
  const {
    textColor1,
    infoColorHover,
    textColor4,
    borderColor,
    borderRadius,
    heightMedium,
    heightSmall,
    heightLarge,
    fontWeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    errorColor,
    borderColorDisabled,
    baseColor
  } = vars
  return {
    ...inputSpecificVariables,
    inputColor: textColor1,
    borderHoverColor: infoColorHover,
    caretColor: infoColorHover,
    placeholderColor: textColor4,
    countColor: textColor4,
    controlsColor: textColor4,
    borderColorDisabled,
    borderColor,
    inputHeightSmall: heightSmall,
    inputHeightMedium: heightMedium,
    inputHeightLarge: heightLarge,
    inputRadius: borderRadius,
    inputBorder: `1px solid ${borderColor}`,
    inputFontWeight: fontWeight,
    inputFontSizeSmall: fontSizeSmall,
    inputFontSizeMedium: fontSizeMedium,
    inputFontSizeLarge: fontSizeLarge,
    borderColorError: errorColor,
    backgroundColor: baseColor,
    countFontSize: fontSizeSmall,
    inputBorderColor: borderColor
  }
}

// 输入框主题
export type InputThemeVars = ReturnType<typeof self>
export const inputLight: Theme<'input', InputThemeVars> = {
  name: 'input',
  common: commonLight,
  self
}
export type InputTheme = typeof inputLight

// 输入组主题
export type InputGroupThemeVars = ReturnType<typeof self>
export const inputGroupLight: Theme<'inputGroup', InputGroupThemeVars> = {
  name: 'inputGroup',
  common: commonLight,
  self
}
export type InputGroupTheme = typeof inputGroupLight

// 输入数字主题
export type InputNumberThemeVars = ReturnType<typeof self>
export const inputNumberLight: Theme<'inputNumber', InputNumberThemeVars> = {
  name: 'inputNumber',
  common: commonLight,
  self
}
export type InputNumberTheme = typeof inputNumberLight

// 多行文本框主题
export type TextareaThemeVars = ReturnType<typeof self>
export const textareaLight: Theme<'textarea', TextareaThemeVars> = {
  name: 'textarea',
  common: commonLight,
  self
}
export type TextareaTheme = typeof textareaLight
