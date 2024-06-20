import type { PropType } from 'vue'
export type Type = 'col' | 'row' | ''
export const titleProps = {
  title: {
    type: String,
    default: ''
  },
  mode: {
    type: String as PropType<Type>,
    default: ''
  }
}
