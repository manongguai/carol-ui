<template>
  <div>
    <cl-steps :active="active" :space="'85px'" style="overflow-x: auto; margin-bottom: 12px">
      <cl-step
        v-for="(item, index) in steps"
        :key="index"
        :title="item.title"
        :description="item.description"
      />
    </cl-steps>
    <cl-button @click="nextStep">下一步</cl-button>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
let steps = reactive([
  { title: '提交订单', description: '2023-08-08' },
  { title: '支付订单', description: '2023-08-08' },
  { title: '取消订单', description: '2023-08-08' }
])
let active = ref(0)
const nextStep = () => {
  if (active.value < steps.length) {
    active.value++
  }
}
</script>

<style></style>
