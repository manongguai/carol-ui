<template>
  <div class="rows">
    <cl-button plain @click="open1"> render函数 </cl-button>
    <cl-button plain @click="open2"> string </cl-button>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { ClNotification } from '@kirkw/carol-ui'

const open1 = () => {
  ClNotification({
    title: '提示',
    message: h('i', { style: 'color: orange' }, '我是render函数'),
    footerInfo: h('i', { style: 'color: orange' }, '我是footer')
  })
}

const open2 = () => {
  ClNotification({
    title: '提示',
    message: '我是string'
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
