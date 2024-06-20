<template>
  <div class="cl-color-picker-popup">
    <div class="cl-color-picker-panel">
      <div class="cl-color-picker-panel-content">
        <sv-panel
          @svChange="svChange"
          @svChangeComplete="svChangeComplete"
          :saturation="saturation"
          :svValue="svValue"
          :background="background"
        ></sv-panel>
        <hue-slider
          @hueChangeComplete="hueChangeComplete"
          @hueChange="hueChange"
          :hue="hue"
        ></hue-slider>
      </div>
      <predefine-colors
        v-show="predefine.length"
        @colorSelected="colorSelected"
        :colorValue="colorValue"
        :colors="predefine"
      ></predefine-colors>
      <div class="cl-color-picker-panel-form">
        <div class="cl-color-picker-panel-input">
          <cl-input :clearable="false" @change="colorEnter" v-model="inputValue">
            <template #prefix>
              <span>#</span>
            </template>
          </cl-input>
        </div>
        <cl-button
          class="cl-color-picker-panel-button"
          @click="colorSave"
          type="primary"
          size="small"
          scene="info"
          >确定</cl-button
        >
        <cl-button
          class="cl-color-picker-panel-button"
          style="margin-right: 12px"
          @click="colorReset"
          type="text"
          size="small"
          scene="info"
          icon="cl-icon-reset"
          >重置</cl-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import flInput from '@/components/input'
import flButton from '@/components/button'
import hueSlider from './hueSlider.vue'
import svPanel from './svPanel.vue'
import predefineColors from './predefineColors.vue'
import { validHexString, toHexString, toHsv } from '../util'
import { colorPanelEmits, colorPanelProps } from './colorPanel'
import { nextTick, ref, watch } from 'vue'
const props = defineProps(colorPanelProps)
const emits = defineEmits(colorPanelEmits)
const colorValue = ref('')
const hue = ref(0)
const saturation = ref(0)
const svValue = ref(100)
const background = ref('hsl(0, 100%, 50%)')
const inputValue = ref('')
function colorEnter(value: string) {
  let oldValue = colorValue.value
  let hexValue = validHexString(value.substring(0, 6), oldValue)
  nextTick(() => {
    colorValue.value = inputValue.value = hexValue
    setHsv()
  })
}
function setHsv() {
  if (colorValue.value) {
    ;[hue.value, saturation.value, svValue.value] = toHsv(colorValue.value)
    background.value = 'hsl(' + hue.value + ', 100%, 50%)'
  } else {
    ;[hue.value, saturation.value, svValue.value] = [0, 0, 100]
    background.value = 'hsl(0, 100%, 50%)'
  }
}
function colorReset() {
  colorValue.value = props.modelValue
  setHsv()
}
function colorSelected(color: string) {
  colorEnter(color)
}
function colorSave() {
  emits('colorSave')
  if (colorValue.value == props.modelValue) return
  emits('update:modelValue', colorValue.value)
}
function hueChange(value: number) {
  hue.value = value
  background.value = 'hsl(' + hue.value + ', 100%, 50%)'
  updateColorValue()
}
function hueChangeComplete() {
  // this.updateColorValue();
}
function svChange([s, v]: number[]) {
  saturation.value = s
  svValue.value = v
  updateColorValue()
}
function svChangeComplete() {
  // this.updateColorValue();
}
function updateColorValue() {
  colorValue.value = toHexString(hue.value, saturation.value, svValue.value)
}
watch(
  () => props.modelValue,
  (v) => {
    colorValue.value = v
    setHsv()
  },
  {
    immediate: true
  }
)
watch(
  colorValue,
  (v) => {
    if (inputValue.value === colorValue.value) return
    inputValue.value = v
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
@import '../../styles/colorPanel.scss';
</style>
