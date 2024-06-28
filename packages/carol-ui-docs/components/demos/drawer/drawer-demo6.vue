<template>
  <cl-button @click="openDrawer">自定义内容</cl-button>
  <cl-drawer v-model:show="show" title="标题props">
    <template v-slot:header>Taylor Swift</template>
  </cl-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(false)
    const openDrawer = () => {
      show.value = true
    }

    return {
      show,
      openDrawer
    }
  }
})
</script>
