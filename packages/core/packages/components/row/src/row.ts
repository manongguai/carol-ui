import type { ComputedRef, ExtractPropTypes, PropType } from 'vue'

export type RowJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

export type RowAlign = 'top' | 'middle' | 'bottom'

export const rowProps = {
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * @description grid spacing
   */
  gutter: {
    type: Number,
    default: 0
  },
  /**
   * @description horizontal alignment of flex layout
   */
  justify: {
    type: String as PropType<RowJustify>,
    default: 'start'
  },
  /**
   * @description vertical alignment of flex layout
   */
  align: {
    type: String as PropType<RowAlign>,
    default: 'top'
  }
} as const

export type RowProps = ExtractPropTypes<typeof rowProps>
export const rowEmits = {}

export interface RowInjection {
  gutter: ComputedRef<number>
}
