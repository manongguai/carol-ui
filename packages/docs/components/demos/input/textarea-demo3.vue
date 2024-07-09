<template>
  <div class="row">
    <cl-textarea v-model="data.remark" :maxlength="100" show-word-limit />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
  remark: ''
})
</script>
