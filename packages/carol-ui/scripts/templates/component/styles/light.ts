import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type _Component_ThemeVars = ReturnType<typeof self>

export const _component_Light: Theme<'_component_', _Component_ThemeVars> = {
  name: '_component_',
  common: commonLight,
  self
}

export type _Component_Theme = typeof _component_Light
