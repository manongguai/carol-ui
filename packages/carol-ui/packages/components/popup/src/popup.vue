<template>
  <!-- popup组件 -->
  <!-- 弹出泡pop -->
  <div
    v-if="hasInitPop"
    v-bind="$attrs"
    ref="popRef"
    :style="cssVarsRef"
    :class="['cl-popup', props.animated ? 'cl-popup-visible-transition' : '', props.popupClass]"
    v-show="visible"
  >
    <!-- 箭头的位置由popJS控制，类名是关键字 -->
    <span v-if="visibleArrow" class="popper__arrow" x-arrow="" />
    <slot name="content">{{ content }}</slot>
  </div>
  <!-- 触发元素 -->
  <OnlyChildSlot
    :slots="$slots"
    slot-name="reference"
    v-if="!virtualRef"
    ref="referenceRef"
  ></OnlyChildSlot>
</template>
<script setup lang="ts">
import {
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type CSSProperties,
  computed,
  type Ref
} from 'vue'
import { popupProps, popupEmits } from './popup'
import { usePopper } from './hook'
import useTheme from '@/hooks/use-theme'
import { popupLight } from '../styles/light'
import { createKey } from '@kirkw/utils'
import OnlyChildSlot from '@/components/only-child-slot'
defineOptions({
  name: 'ClPopup'
})
const props = defineProps(popupProps)
const emits = defineEmits(popupEmits)
const visible = ref<boolean>(false)
const referenceRef = ref<InstanceType<typeof OnlyChildSlot> | undefined>()
const referenceSlotEl = computed(() => {
  if (referenceRef.value && referenceRef.value.$el) {
    return referenceRef.value.$el as HTMLElement
  }
  return null
})
const popRef = ref<HTMLElement | undefined>()
const {
  initPop,
  destoryPop,
  hasInitPop,
  addPopEvent,
  removeTriggerEvent,
  addTriggerEvent,
  addReferenceClass
} = usePopper(popRef, referenceSlotEl, props, visible)
watch(hasInitPop, (val) => {
  if (val) {
    // pop 创建后，为pop添加事件
    addPopEvent()
  }
})
watch(visible, (val) => {
  val ? initPop() : destoryPop()
  emits('update:modelValue', val) // 内部可见状态反馈到外部
})
watch(
  () => props.modelValue,
  (val) => {
    nextTick(() => {
      visible.value = val // 外部可见状态同步内部
    })
  },
  {
    immediate: true
  }
)
watch(
  () => props.virtualRef,
  (virtualRef) => {
    if (virtualRef && visible.value) {
      initPop()
    }
  }
)

onBeforeMount(() => {
  // 预渲染
  hasInitPop.value = props.preRender
})
onMounted(() => {
  if (!props.disabled) {
    nextTick(() => {
      addTriggerEvent()
      addReferenceClass()
    })
  }
})
onUnmounted(() => {
  // 销毁popJs实例
  destoryPop()
  // 移除绑定事件
  removeTriggerEvent()
  // 移除append body上的pop元素
  popRef.value && document.body.removeChild(popRef.value)
  // this.$el.parentNode.removeChild(this.$el);
})
const themeRef = useTheme('popup', popupLight)
const cssVarsRef = computed<CSSProperties>(() => {
  const theme = themeRef.value
  const { self } = theme
  const effectProps: CSSProperties = {
    '--cl-popup-opacity': self[createKey('opacity', props.effect)],
    '--cl-popup-color': self[createKey('color', props.effect)],
    '--cl-popup-background-color': self[createKey('backgroundColor', props.effect)],
    '--cl-popup-box-shadow': self[createKey('boxShadow', props.effect)],
    '--cl-popup-arrow-background-color': self[createKey('arrowBackgroundColor', props.effect)],
    '--cl-popup-arrow-border-color': self[createKey('arrowBorderColor', props.effect)]
  }
  return {
    '--cl-popup-padding': self['padding'],
    '--cl-popup-font-size': self['fontSize'],
    '--cl-popup-font-weight': self['fontWeight'],
    '--cl-popup-line-height': self['lineHeight'],
    '--cl-popup-border-radius': self['borderRadius'],
    '--cl-popup-border': self['border'],
    '--cl-popup-arrow-width': self['arrowWidth'],
    '--cl-popup-arrow-space': '-' + self['arrowSpace'],
    '--cl-popup-arrow-height': self['arrowHeight'],
    ...effectProps
  }
})
</script>

<style>
.cl-popup-txt-over-line {
  word-wrap: break-word;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  display: -moz-box;
}
</style>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
