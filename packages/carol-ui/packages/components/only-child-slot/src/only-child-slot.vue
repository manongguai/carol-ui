<script lang="ts">
import { defineComponent, h, Comment, Fragment, Text, toRefs, computed } from 'vue'
import type { Slot, VNode, SlotsType } from 'vue'
import { onlyChildSlotProps } from './only-child-slot'
export default defineComponent({
  name: 'OnlyChildSlot',
  props: onlyChildSlotProps,
  setup(props, { attrs }) {
    const { slots, slotName } = toRefs(props)
    const slot = computed(() => slots.value[slotName.value as unknown as keyof SlotsType] as Slot)
    // 获取第一个真实node
    function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
      if (!node) return null
      const children = node as VNode[]
      for (const child of children) {
        if (child && typeof child === 'object' && child.type) {
          switch (child.type) {
            case Comment:
              continue
            case Text:
            case 'svg':
              return wrapTextContent(child)
            case Fragment:
              return findFirstLegitChild(child.children as VNode[])
            default:
              return child
          }
        }
        return wrapTextContent(child)
      }
      return null
    }
    function wrapTextContent(s: string | VNode) {
      return h('span', s)
    }
    return () => {
      if (slot.value) {
        const slots = slot.value(attrs)
        const vNode = findFirstLegitChild(slots)
        if (!vNode) return null
        return h(vNode, { ...attrs })
      }
      return null
    }
  }
})
</script>
