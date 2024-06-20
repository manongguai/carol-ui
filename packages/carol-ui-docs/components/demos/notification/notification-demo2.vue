<template>
  <div class="rows">
    <cl-button plain @click="open1"> 自动关闭 </cl-button>
    <cl-button plain @click="open2"> 不自动关闭</cl-button>
  </div>
</template>

<script lang="ts" setup>
import { ClNotification } from '@kirkw/carol-ui'

const open1 = () => {
  ClNotification({
    title: '提示',
    message: '我默认3秒关闭'
  })
}

const open2 = () => {
  ClNotification({
    title: '提示',
    message: '我不会自动关闭',
    duration: 0
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
