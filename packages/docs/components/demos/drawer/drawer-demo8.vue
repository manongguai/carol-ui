<template>
  <div>
    <cl-button @click="openDrawer" type="primary" style="margin-top: 10px">点击打开抽屉</cl-button>
    <cl-drawer
      v-model:show="show"
      :headerStyle="headerStyle"
      :bodyStyle="bodyStyle"
      :footerStyle="footerStyle"
    >
      <template #header>
        <span>标题插槽</span>
      </template>
      <p style="margin: 0">默认插槽，展示抽屉的内容</p>
      <template #footer>
        <cl-button>取消</cl-button>
        <cl-button type="primary">确认</cl-button>
      </template>
    </cl-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(false)
    const headerStyle = {
      height: '100px',
      background: '#abc5a8',
      borderBottom: 'none'
    }
    const bodyStyle = {
      padding: '0 10px',
      background: '#cde1d4'
    }

    const footerStyle = {
      height: '50px',
      background: '#8ecfa6'
    }
    const openDrawer = () => {
      show.value = true
    }
    return {
      show,
      headerStyle,
      bodyStyle,
      footerStyle,
      openDrawer
    }
  }
})
</script>
