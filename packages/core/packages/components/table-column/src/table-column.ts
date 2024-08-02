import type { TextAlign } from '@/constants/common'
import { isString, isStringNumber } from '@kirkw/utils'
import { isNumber } from 'lodash'
import type { PropType } from 'vue'

export const tableColumnProps = {
  prop: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  type: {
    type: String
  },
  width: {
    type: [Number, String]
  },
  minWidth: {
    type: [Number, String]
  },
  align: {
    type: String as PropType<TextAlign>
  },
  sortable: {
    type: Boolean,
    default: false
  },
  showOverflowTooltip: {
    type: Boolean,
    default: true
  },
  fixed: {
    type: Boolean,
    default: false
  }
}
export const tableColumnEmits = {}
