import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'

export const self = (vars: ThemeCommonVars) => {
  const {
    modalColor,
    textColor1,
    textColor2,
    boxShadow3,
    fontWeightStrong,
    dividerColor2,
    primaryColorHover
  } = vars
  return {
    headerHorizantalPadding: '0 12px',
    headerVerticalPadding: '0 24px',
    bodyHorizantalPadding: '24px 12px',
    bodyVerticalPadding: '8px 24px',
    footerHorizantalPadding: '0 12px',
    footerVerticalPadding: '0 24px',
    drawerBorderRadius: '8px',
    color: modalColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    titleFontSize: '18px',
    titleFontWeight: fontWeightStrong,
    boxShadow: boxShadow3,
    enterDuration: '0.3s',
    leaveDuration: '0.2s',
    headerBorderBottom: `1px solid ${dividerColor2}`,
    footerBorderTop: `1px solid ${dividerColor2}`,
    closeIconColor: '#909399',
    closeIconColorHover: '#333',
    closeIconSize: '18px',
    resizableTriggerColorHover: primaryColorHover
  }
}

export type DrawerThemeVars = ReturnType<typeof self>

export const drawerLight: Theme<'drawer', DrawerThemeVars> = {
  name: 'drawer',
  common: commonLight,
  self
}

export type DrawerTheme = typeof drawerLight
