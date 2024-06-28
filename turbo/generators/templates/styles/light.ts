import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const { textColorBase } = vars
  return {
    color: textColorBase
  }
}

export type {{upperCamelCaseName}}ThemeVars = ReturnType<typeof self>

export const {{lowerCamelCaseName}}Light: Theme<'{{lowerCamelCaseName}}', {{upperCamelCaseName}}ThemeVars> = {
  name: '{{lowerCamelCaseName}}',
  common: commonLight,
  self
}

export type {{upperCamelCaseName}}Theme = typeof {{lowerCamelCaseName}}Light
