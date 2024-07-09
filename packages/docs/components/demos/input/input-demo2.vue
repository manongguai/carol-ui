<template>
  <div class="row">
    <cl-input v-model="data.value" :maxlength="5" show-word-limit />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
  value: ''
})
</script>
