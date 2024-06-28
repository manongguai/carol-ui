<template>
  <div class="row">
    <span>默认：</span>
    <cl-color-picker v-model="color1"></cl-color-picker>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const color1 = ref('')
</script>

<style lang="scss" scoped>
@import '../popup/popup-demo.scss';
</style>
