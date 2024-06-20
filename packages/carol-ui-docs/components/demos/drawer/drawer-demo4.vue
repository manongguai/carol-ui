<template>
  <cl-button @click="openFirstDrawer" style="margin: 5px">第一层抽屉</cl-button>
  <cl-drawer v-model:show="outerShow" :width="600">
    <template v-slot:header>第一层抽屉</template>
    <cl-button @click="openSecondDrawer" style="margin: 5px">第二层抽屉</cl-button>
    <cl-drawer v-model:show="innerShow" v-model:width="innerWidth" resizable>
      <template v-slot:header>第二层抽屉</template>
    </cl-drawer>
  </cl-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const outerShow = ref(false)
    const innerShow = ref(false)
    const innerWidth = ref(300)
    const openFirstDrawer = () => {
      outerShow.value = true
    }
    const openSecondDrawer = () => {
      innerShow.value = true
    }

    return {
      outerShow,
      innerShow,
      openFirstDrawer,
      openSecondDrawer,
      innerWidth
    }
  }
})
</script>
