<template>
  <div class="row">
    <div>
      <span class="tips">基础用法</span>
      <cl-input-number v-model="form.num1" />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const form = reactive({
  num1: null
})
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  .tips {
    display: block;
  }
  .cl-input {
    margin-top: 12px;
  }
}
</style>
