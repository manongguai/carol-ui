<template>
  <cl-button-group>
    <cl-button @click="openDrawer('top')"> 上 </cl-button>
    <cl-button @click="openDrawer('right')"> 右 </cl-button>
    <cl-button @click="openDrawer('bottom')"> 下 </cl-button>
    <cl-button @click="openDrawer('left')"> 左 </cl-button>
  </cl-button-group>
  <cl-drawer v-model:show="show" :placement="placement">从 {{ placement }} 方向弹出抽屉</cl-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(false)
    const placement = ref('right')
    const openDrawer = (place) => {
      show.value = true
      placement.value = place
    }
    return {
      show,
      placement,
      openDrawer
    }
  }
})
</script>
