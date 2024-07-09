<template>
  <div>
    <cl-button @click="unSetSize" style="margin: 5px">未设置宽度</cl-button>
    <cl-button @click="setLargeSize" style="margin: 5px">未设置width，size设为large</cl-button>
  </div>
  <div>
    <cl-button @click="unSetSizeFromBottomOpen" style="margin: 5px"
      >未设置高度，从底部弹出</cl-button
    >
    <cl-button @click="setLargeSizeFromBottomOpen">未设置height，size设为large</cl-button>
  </div>
  <div>
    <cl-button @click="setWidth" style="margin: 5px">设置width</cl-button>
  </div>
  <p>size取值分为small / default / large 默认取值default</p>
  <p>在左右弹出的情况下：small对应长度320px, default对应长度400px， large对应长度560px</p>
  <p>在上下弹出的情况下：small对应长度40%, default对应长度60%， large对应长度80%</p>
  <p style="color: red">在width和size同时存在的情况下，以width优先，height同理</p>

  <cl-drawer v-model:show="show" :size="size" :placement="placement" :width="width"
    >通过size、width、height给抽屉设置宽高</cl-drawer
  >
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(false)
    const size = ref('default')
    const placement = ref('right')
    const width = ref(0)
    const unSetSize = () => {
      placement.value = 'right'
      show.value = true
      size.value = 'default'
    }
    const setLargeSize = () => {
      placement.value = 'right'
      show.value = true
      size.value = 'large'
      width.value = 0
    }
    const unSetSizeFromBottomOpen = () => {
      placement.value = 'bottom'
      show.value = true
      size.value = 'default'
      width.value = 0
    }

    const setLargeSizeFromBottomOpen = () => {
      placement.value = 'bottom'
      show.value = true
      size.value = 'large'
      width.value = 0
    }

    const setWidth = () => {
      placement.value = 'right'
      show.value = true
      width.value = 600
    }

    return {
      show,
      size,
      placement,
      width,
      unSetSize,
      setLargeSize,
      unSetSizeFromBottomOpen,
      setLargeSizeFromBottomOpen,
      setWidth
    }
  }
})
</script>
