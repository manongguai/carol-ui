export const componentSizes = ['small', 'medium', 'large'] as const

export type ComponentSize = (typeof componentSizes)[number]

export const componentSizeMap = {
  large: 40,
  medium: 32,
  small: 24
} as const
