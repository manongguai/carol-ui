<template>
  <div>
    <cl-input v-model="data.phone" type="phone" />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
  phone: ''
})
</script>
