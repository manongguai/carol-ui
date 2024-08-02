export const textAlign = ['small', 'medium', 'large'] as const

export type TextAlign = (typeof textAlign)[number]
