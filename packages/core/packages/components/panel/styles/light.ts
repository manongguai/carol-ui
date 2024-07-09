import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
const commonVariables = {
  panelMargin: '11px 16px',
  borderRadio: '11px',
  panelPadding: '12px',
  fontSize: '18px',
  titlePadding: '15px',
  titleWidth: '4px',
  titleHeight: '76%'
}
export const self = (vars: ThemeCommonVars) => {
  const { baseColor, textColor2, primaryColor } = vars
  return {
    ...commonVariables,
    color: textColor2,
    bgColor: baseColor,
    titleTypeColor: primaryColor
  }
}

export type PanelThemeVars = ReturnType<typeof self>

export const panelLight: Theme<'panel', PanelThemeVars> = {
  name: 'panel',
  common: commonLight,
  self
}

export type PanelTheme = typeof panelLight
