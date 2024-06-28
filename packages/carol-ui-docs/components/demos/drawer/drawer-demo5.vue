<template>
  <cl-button @click="openDrawer('top')"> 上 </cl-button>
  <cl-button @click="openDrawer('right')"> 右 </cl-button>
  <cl-button @click="openDrawer('bottom')"> 下 </cl-button>
  <cl-button @click="openDrawer('left')"> 左 </cl-button>
  <cl-drawer
    v-model:show="outerShow"
    :placement="placement"
    to=".drawer-demo-container"
    resizable
    v-model:height="height"
    v-model:width="width"
  ></cl-drawer>
  <div class="drawer-demo-container">
    <div class="scroll-container">
      <p>在该容器内部打开抽屉</p>
      <p>测试有滚动条的情况下，抽屉打开时，滚动条是否隐藏</p>
      <p>测试有滚动条的情况下，抽屉打开时，滚动条是否隐藏</p>
      <p>测试有滚动条的情况下，抽屉打开时，滚动条是否隐藏</p>
      <p>测试有滚动条的情况下，抽屉打开时，滚动条是否隐藏</p>
      <p>测试有滚动条的情况下，抽屉打开时，滚动条是否隐藏</p>
      <p>测试有滚动条的情况下，抽屉打开时，滚动条是否隐藏</p>
      <p>测试有滚动条的情况下，抽屉打开时，滚动条是否隐藏</p>
      <p>测试有滚动条的情况下，抽屉打开时，滚动条是否隐藏</p>
      <p>测试有滚动条的情况下，抽屉打开时，滚动条是否隐藏</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const outerShow = ref(false)
    const height = ref(100)
    const width = ref(100)
    const placement = ref('right')
    const openDrawer = (place) => {
      outerShow.value = true
      placement.value = place
    }

    return {
      outerShow,
      placement,
      openDrawer,
      height,
      width
    }
  }
})
</script>

<style scoped>
.drawer-demo-container {
  position: relative;
  width: 600px;
  height: 400px;
  overflow: hidden;
  margin-top: 10px;
  border: 1px solid #10b981;
}
.scroll-container {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  color: #10b981;
  overflow: auto;
}
</style>
