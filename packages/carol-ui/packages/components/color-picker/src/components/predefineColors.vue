<template>
  <div class="cl-color-picker-predefine">
    <div class="cl-color-picker-predefine-colors">
      <div
        class="cl-color-picker-predefine-color"
        :class="{ 'cl-color-picker-predefine-color__selected': item.selected }"
        v-for="(item, index) in hexColors"
        :key="index"
        :style="{ background: '#' + item.color }"
        @click="handleSelect(item.color)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { validHexString } from '../util'
import {
  predefineColorsEmits,
  predefineColorsProps,
  type PredefineColorsData
} from './predefineColors'
const props = defineProps(predefineColorsProps)
const emits = defineEmits(predefineColorsEmits)
const hexColors = computed<PredefineColorsData[]>(() => {
  return parseColors(props.colors, props.colorValue)
})
function handleSelect(color: string) {
  emits('colorSelected', color)
}
function parseColors(colors: string[], colorValue: string) {
  return colors.map((value) => {
    return {
      color: validHexString(value),
      selected: colorValue == value
    }
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/predefineColors.scss';
</style>
