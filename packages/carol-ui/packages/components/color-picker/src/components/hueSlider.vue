<template>
  <div class="cl-color-picker-pannel-slider">
    <div
      ref="sliderRef"
      @mousedown="handleMouseDown"
      :style="{ margin: `${HANDLE_SIZE_NUM / 2}px 0;` }"
      class="cl-color-picker-pannel-slider-container"
    >
      <div
        :style="{ top: `calc((${hue}%) / 359 * 100)` }"
        class="cl-color-picker-pannel-slider-pointer"
      >
        <div
          :style="{ height: HANDLE_SIZE, transform: `translateY(-${HANDLE_SIZE_NUM / 2}px)` }"
          class="cl-color-picker-pannel-slider-picker"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { hueSliderEmits, hueSliderProps } from './hueSlider'
import { normalizeHue } from '../util'
const HANDLE_SIZE = '4px'
const HANDLE_SIZE_NUM = 4
defineProps(hueSliderProps)
const emits = defineEmits(hueSliderEmits)
const sliderRef = ref<HTMLElement | undefined>()
function handleMouseDown(e: MouseEvent) {
  if (!sliderRef.value) return
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp), { once: true }
  handleMouseMove(e)
}
function handleMouseMove(e: MouseEvent) {
  if (!sliderRef.value) return
  const { height, top } = sliderRef.value.getBoundingClientRect()
  // 去除height的margin = HANDLE_SIZE_NUM
  const newHue = normalizeHue(((e.clientY - top) / (height - HANDLE_SIZE_NUM)) * 360)
  emits('hueChange', newHue)
}
function handleMouseUp() {
  if (!sliderRef.value) return
  document.removeEventListener('mousemove', handleMouseMove)
}
</script>

<style lang="scss" scoped>
@import '../../styles/hueSlider.scss';
</style>
