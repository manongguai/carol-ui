<template>
  <div class="rows">
    <cl-button plain @click="open1"> 成功 </cl-button>
    <cl-button plain @click="open2"> 警告 </cl-button>
    <cl-button plain @click="open3"> 消息 </cl-button>
    <cl-button plain @click="open4"> 错误 </cl-button>
  </div>
</template>

<script lang="ts" setup>
import { ClNotification } from '@kirkw/carol-ui'

const open1 = () => {
  ClNotification({
    title: '成功标题不超过10个字',
    message: '这是一条成功的提示消息',
    type: 'success'
  })
}

const open2 = () => {
  ClNotification({
    title: '警告',
    message: '这是一条警告的提示消息',
    type: 'warning'
  })
}

const open3 = () => {
  ClNotification.info({
    title: '消息',
    message: '这是一条消息提示'
  })
}

const open4 = () => {
  ClNotification.error({
    title: '错误',
    message: '这是一条错误的提示消息'
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
