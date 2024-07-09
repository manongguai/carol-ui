export const formLabelPosition = ['left', 'right', 'top'] as const

export type FormLabelPosition = (typeof formLabelPosition)[number]

export const requireAsteriskPosition = ['left', 'right'] as const

export type RequireAsteriskPosition = (typeof requireAsteriskPosition)[number]
