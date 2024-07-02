<template>
  <div
    :class="[
      'cl-color-picker-content',
      `cl-color-picker-content-size-${sizeEnums[size] || 'default'}`
    ]"
  >
    <div class="cl-color-picker-disk" @click="colorIsShowPannel">
      <div
        class="cl-color-picker-disk-content"
        :class="{ 'cl-color-picker-disk-content__disabled': disabled }"
        :style="{ background: modelValue ? '#' + modelValue : disabled ? '#F3F4F7' : 'none' }"
      >
        <div class="cl-color-picker-disk-content-empty" v-show="!modelValue && !disabled"></div>
      </div>
      <div
        v-if="showColorIcon"
        class="cl-color-picker-disk-icon"
        :class="{
          'cl-color-picker-disk-icon__disabled': disabled
        }"
      >
        <cl-icon class="sepan-icon" iconName="cl-icon-sepan"></cl-icon>
      </div>
    </div>
    <div class="cl-color-picker-input" v-if="showColorInput">
      <cl-input :disabled="disabled" :clearable="false" @change="colorEnter" v-model="inputValue">
        <template #prefix>
          <span>#</span>
        </template>
      </cl-input>
    </div>
    <cl-button
      v-if="showResetButton"
      class="cl-color-picker-reset"
      style="margin-left: 9px"
      :disabled="disabled"
      @click="colorReset"
      type="text"
      :size="size"
      scene="info"
      icon="cl-icon-reset"
      >重置</cl-button
    >
  </div>
</template>

<script setup lang="ts">
import clInput from '@/components/input'
import clButton from '@/components/button'
import clIcon from '@/components/icon'
import { ColorContentEmits, colorContentProps } from './colorContent'
import { validHexString } from '../util'
import { ref, watch } from 'vue'
const sizeEnums = {
  medium: 'medium',
  small: 'small'
}
const props = defineProps(colorContentProps)
const emits = defineEmits(ColorContentEmits)
const inputValue = ref('')
function colorEnter(value: string) {
  let oldValue = props.modelValue
  let newValue = value.substring(0, 6)
  let hexValue = validHexString(newValue, oldValue)
  inputValue.value = hexValue
  emits('change', hexValue)
  emits('update:modelValue', hexValue)
}
function colorReset() {
  emits('reset')
}
function colorIsShowPannel() {
  if (props.disabled) return
  emits('panelVisibleChange')
}
watch(
  () => props.modelValue,
  (value) => {
    inputValue.value = value
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@import '../../styles/colorContent.scss';
</style>
