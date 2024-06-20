import type { Component, PropType } from 'vue'
export const stepProps = {
  title: {
    type: String,
    default: ''
  },
  space: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  }
}
export const stepEmits = {}
