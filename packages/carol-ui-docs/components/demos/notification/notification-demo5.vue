<template>
  <div class="rows">
    <cl-button plain @click="open1"> 自定义底部 </cl-button>
    <cl-button plain @click="open2"> 自定义icon </cl-button>
    <cl-button plain @click="open3"> 超出滚动 </cl-button>
    <cl-button plain @click="open4"> 全局方法 </cl-button>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { ClNotification } from '@kirkw/carol-ui'
// todo 获取不到挂载的全局方法
const instance = getCurrentInstance()
const $clNotify = instance?.appContext.config.globalProperties.$clNotify

const open1 = () => {
  ClNotification({
    title: '提示',
    message: '<span style="color: red">我是自定义底部的消息</span>',
    dangerouslyUseHTMLString: true,
    footerInfo: '<button style="color:#fff;background:#2080f0;padding:0 8px">操作<button>',
    beforeClose: function () {
      console.log('我是关闭前的回调')
    }
  })
}

const open2 = () => {
  ClNotification({
    message: '这是一个没有title自定义icon的提示消息',
    iconName: 'cl-icon-loading'
  })
}

const open3 = () => {
  ClNotification({
    title: '提示',
    message:
      '超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动超出滚动'
  })
}

const open4 = () => {
  $clNotify({
    title: '提示',
    message: '全局方法 $notify'
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
