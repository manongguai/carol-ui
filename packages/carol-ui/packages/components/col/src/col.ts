import type { ExtractPropTypes, PropType } from 'vue'
export type ColSizeObject = {
  span?: number
  offset?: number
  pull?: number
  push?: number
}
export type ColSize = number | ColSizeObject

export const colProps = {
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * @description number of column the grid spans
   */
  span: {
    type: Number,
    default: 24
  },
  /**
   * @description number of spacing on the left side of the grid
   */
  offset: {
    type: Number,
    default: 0
  },
  /**
   * @description number of columns that grid moves to the left
   */
  pull: {
    type: Number,
    default: 0
  },
  /**
   * @description number of columns that grid moves to the right
   */
  push: {
    type: Number,
    default: 0
  },
  /**
   * @description `<768px` Responsive columns or column props object
   */
  xs: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as ColSize)
  },
  /**
   * @description `≥768px` Responsive columns or column props object
   */
  sm: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as ColSize)
  },
  /**
   * @description `≥992px` Responsive columns or column props object
   */
  md: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as ColSize)
  },
  /**
   * @description `≥1200px` Responsive columns or column props object
   */
  lg: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as ColSize)
  },
  /**
   * @description `≥1920px` Responsive columns or column props object
   */
  xl: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as ColSize)
  }
} as const

export type ColProps = ExtractPropTypes<typeof colProps>
export const colEmits = {}
