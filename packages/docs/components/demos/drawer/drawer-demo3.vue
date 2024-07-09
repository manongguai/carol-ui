<template>
  <cl-button @click="openDrawerTop" style="margin: 5px"> 上下拖动 </cl-button>
  <cl-button @click="openDrawerLeft" style="margin: 5px"> 左右拖动 </cl-button>
  <cl-drawer
    v-model:show="show"
    :placement="placement"
    v-model:height="height"
    v-model:width="width"
    resizable
  >
    <template v-slot:header>可以拖动的弹窗</template>
    从 {{ placement }} 方向拖动弹窗
  </cl-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(false)
    const placement = ref()

    const width = ref(500)
    const height = ref(300)
    const openDrawerTop = () => {
      show.value = true
      placement.value = 'top'
    }
    const openDrawerLeft = () => {
      show.value = true
      placement.value = 'left'
    }

    return {
      openDrawerTop,
      openDrawerLeft,
      placement,
      show,
      height,
      width
    }
  }
})
</script>
