<template>
  <div>
    <cl-steps :active="active" :space="'85px'" style="overflow-x: auto; margin-bottom: 12px">
      <cl-step
        v-for="(item, index) in steps"
        :key="index"
        :title="item.title"
        :description="item.description"
        :status="item.status"
      >
        <template #title v-if="index === 2">自定义title</template>
        <template #description v-if="index === 2">自定义description</template>
        <template #icon v-if="index === 2">
          <cl-icon iconName="cl-icon-yonghu"></cl-icon>
        </template>
      </cl-step>
    </cl-steps>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const steps = [
  { title: '提交订单', description: '2023-08-08', status: 'wait' },
  { title: '支付订单', description: '2023-08-08' },
  { title: '取消订单', description: '2023-08-08' }
]
let active = ref(2)
</script>

<style></style>
