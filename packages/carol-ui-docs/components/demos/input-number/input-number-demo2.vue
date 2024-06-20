<template>
  <div>
    <span class="tips">控制器位置：左右、右侧上下、不显示</span>
    <cl-input-number v-model="form.value1" layout="between" />
    <br />
    <cl-input-number v-model="form.value2" layout="right" />
    <br />
    <cl-input-number v-model="form.value3" layout="none" />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const form = reactive({
  value1: null,
  value2: null,
  value3: null
})
</script>
<style lang="scss" scoped>
.tips {
  display: block;
}
.cl-input-number {
  margin-top: 12px;
}
</style>
