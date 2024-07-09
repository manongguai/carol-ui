import type { Theme } from '@/hooks/use-theme'
import commonLight from '@/styles/light'
import type { ThemeCommonVars } from '@/styles'

const commonVariables = {
  fontSize: '18px',
  rowTitlePaddingLeft: '15px',
  rowWidth: '4px',
  rowHeight: '18px',
  rowTop: '50%',
  colPadding: '10px'
}

export const self = (vars: ThemeCommonVars) => {
  const { textColor2, dividerColor2, minorColor, fontWeightStrong } = vars
  return {
    ...commonVariables,
    textColorMinor: minorColor,

    //font
    titleColor: textColor2,
    fontWeightStrong,

    //row
    borderLine: dividerColor2
  }
}

export type TitleThemeVars = ReturnType<typeof self>

export const titleLight: Theme<'Title', TitleThemeVars> = {
  name: 'Title',
  common: commonLight,
  self
}

export type TitleTheme = typeof titleLight
