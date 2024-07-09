<template>
  <div>
    <cl-textarea v-model="data.value1" :rows="1" />
  </div>
  <br />
  <div>
    <cl-textarea v-model="data.value2" :minRows="2" :maxRows="2" />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
  value1: '我是Carol1',
  value2: '我是Carol2'
})
</script>
