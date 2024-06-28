<template>
  <div class="row"></div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const form = reactive({})
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
