import { isString, isStringNumber } from '@kirkw/utils'
import { isNumber } from 'lodash'

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
  }
}
export const tableColumnEmits = {}
