import { isNumber } from '@kirkw/utils'
import type { PropType, StyleValue } from 'vue'

export const scrollbarProps = {
  /**
   * @description height of scrollbar
   */
  height: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description max height of scrollbar
   */
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description whether to use the native scrollbar
   */
  native: {
    type: Boolean,
    default: false
  },
  /**
   * @description style of wrap
   */
  wrapStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: ''
  },
  /**
   * @description class of wrap
   */
  wrapClass: {
    type: [String, Array],
    default: ''
  },
  /**
   * @description class of view
   */
  viewClass: {
    type: [String, Array],
    default: ''
  },
  /**
   * @description style of view
   */
  viewStyle: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * @description do not respond to container size changes, if the container size does not change, it is better to set it to optimize performance
   */
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  /**
   * @description element tag of the view
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * @description always show
   */
  always: Boolean,
  /**
   * @description minimum size of scrollbar
   */
  minSize: {
    type: Number,
    default: 20
  }
}
export const scrollbarEmits = {
  scroll: ({ scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number }) =>
    [scrollTop, scrollLeft].every(isNumber)
}

export type ScrollbarEmits = typeof scrollbarEmits
