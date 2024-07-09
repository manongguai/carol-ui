<template>
  <div class="rows">
    <cl-button plain @click="open1"> 右上角 </cl-button>
    <cl-button plain @click="open2"> 右下角 </cl-button>
    <cl-button plain @click="open3"> 左下角 </cl-button>
    <cl-button plain @click="open4"> 左上角 </cl-button>
  </div>
</template>

<script lang="ts" setup>
import { ClNotification } from '@kirkw/carol-ui'

const open1 = () => {
  ClNotification({
    title: '自定义位置',
    message: '右上角弹出的消息'
  })
}

const open2 = () => {
  ClNotification({
    title: '自定义位置',
    message: '右下角弹出的消息',
    position: 'bottom-right'
  })
}

const open3 = () => {
  ClNotification({
    title: '自定义位置',
    message: '左下角弹出的消息',
    position: 'bottom-left'
  })
}

const open4 = () => {
  ClNotification({
    title: '自定义位置',
    message: '左下角弹出的消息',
    position: 'top-left'
  })
}
</script>
<style lang="scss">
.rows {
  .cl-button {
    margin-right: 8px;
  }
}
</style>
