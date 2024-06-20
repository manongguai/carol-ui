<template>
  <div class="row">
    <cl-textarea v-model="data.remark" />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
  remark: ''
})
</script>
