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
  value1: '我是念念1',
  value2: '我是念念2'
})
</script>
