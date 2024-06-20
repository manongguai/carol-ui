<template>
  <div>
    <cl-steps :active="active" :space="'85px'" align-center style="overflow-x: auto">
      <cl-step
        v-for="(item, index) in steps"
        :key="index"
        :title="item.title"
        :description="item.description"
      />
    </cl-steps>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const steps = [
  { title: '提交订单', description: '2023-08-08' },
  { title: '支付订单', description: '2023-08-08' },
  { title: '取消订单', description: '2023-08-08' }
]
let active = ref(2)
</script>

<style></style>
