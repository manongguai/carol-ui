import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = () => {
  return {
    titleIconSpace: '6px',
    titleFontSize: '16px',
    titleFontWeight: 500,
    titleColor: '#222b3c',
    titleMarginBottom: '10px',
    contentMarginBottom: '20px',
    contentPadding: '0 20px',
    contentColor: '#61666b',
    actionMarginTop: '20px'
  }
}

export type PopConfirmThemeVars = ReturnType<typeof self>

export const popConfirmLight: Theme<'popConfirm', PopConfirmThemeVars> = {
  name: 'popConfirm',
  common: commonLight,
  self
}

export type PopConfirmTheme = typeof popConfirmLight
