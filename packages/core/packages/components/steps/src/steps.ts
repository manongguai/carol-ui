export const stepsProps = {
  space: {
    type: String,
    default: ''
  },
  active: {
    type: Number,
    default: 0
  },
  finishStatus: {
    type: String,
    default: 'finish'
  },
  processStatus: {
    type: String,
    values: ['wait', 'process', 'finish'],
    default: 'process'
  },
  alignCenter: {
    type: Boolean,
    values: ['wait', 'process', 'finish'],
    default: false
  }
}
export const stepsEmits = {}
