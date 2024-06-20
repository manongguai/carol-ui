<template>
  <div>
    <div class="row">
      <cl-input v-model="data.value1" />
      <cl-input v-model="data.value2" />
    </div>
    <div class="row">
      <cl-input v-model="data.value3" readonly />
      <cl-input v-model="data.value4" disabled />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
  value1: '',
  value2: '可清空',
  value3: '只读模式',
  value4: '禁用模式'
})
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  .cl-input {
    margin-top: 12px;
  }
}
</style>
