<template>
  <div
    @mousedown="handleMouseDown"
    ref="panelRef"
    class="cl-color-picker-panel-hsv"
    :style="{ background: background }"
  >
    <div class="cl-color-picker-panel-hsv__white panel_position"></div>
    <div class="cl-color-picker-panel-hsv__black panel_position"></div>
    <div
      class="cl-color-picker-panel-hsv__cursor"
      :style="{
        left: `calc(${saturation}% - ${RADIUS})`,
        bottom: `calc(${svValue}%  - ${RADIUS})`
      }"
    >
      <div class="cl-color-picker-panel-hsv__circle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { svPanelProps, svPanelEmits } from './svPanel'
const RADIUS = '2px'
defineProps(svPanelProps)
const emits = defineEmits(svPanelEmits)
const panelRef = ref<HTMLElement | undefined>()
function handleMouseDown(e: MouseEvent) {
  if (!panelRef.value) return
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp, { once: true })
  handleMouseMove(e)
}
function handleMouseMove(e: MouseEvent) {
  if (!panelRef.value) return
  const { width, height, left, bottom } = panelRef.value.getBoundingClientRect()
  const newV = (bottom - e.clientY) / height
  const newS = (e.clientX - left) / width
  const normalizedNewS = 100 * (newS > 1 ? 1 : newS < 0 ? 0 : newS)
  const normalizedNewV = 100 * (newV > 1 ? 1 : newV < 0 ? 0 : newV)
  emits('svChange', [normalizedNewS, normalizedNewV])
}
function handleMouseUp() {
  if (!panelRef.value) return
  document.removeEventListener('mousemove', handleMouseMove)
}
</script>

<style lang="scss" scoped>
@import '../../styles/svPanel.scss';
</style>
