export const tableLayout = ['fixed', 'auto'] as const

export type TableLayout = (typeof tableLayout)[number]
