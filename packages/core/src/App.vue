<template>
  <div>
    <cl-table :data="data"> </cl-table>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'

const data = ref([])
</script>

<style></style>
