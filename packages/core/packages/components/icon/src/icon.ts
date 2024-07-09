import type { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  color: String,
  iconName: String
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>
