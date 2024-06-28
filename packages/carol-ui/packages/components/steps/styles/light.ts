import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'

const commonVariables = {
  padding: '8px 40px'
}
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase,
    ...commonVariables
  }
}

export type StepsThemeVars = ReturnType<typeof self>

export const stepsLight: Theme<'steps', StepsThemeVars> = {
  name: 'steps',
  common: commonLight,
  self
}

export type StepsTheme = typeof stepsLight
