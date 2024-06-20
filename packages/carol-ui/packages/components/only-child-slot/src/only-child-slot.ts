import type { SlotsType, PropType, ExtractPropTypes } from 'vue'

export const onlyChildSlotProps = {
  slots: {
    type: Object as PropType<SlotsType>,
    required: true
  },
  slotName: {
    type: String,
    default: 'default'
  }
} as const

export type OnlyChildSlotProps = ExtractPropTypes<typeof onlyChildSlotProps>
