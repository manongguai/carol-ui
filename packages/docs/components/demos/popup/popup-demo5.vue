<template>
  <div class="row">
    <cl-popup content="hover">
      <template #reference>
        <cl-button>hover</cl-button>
      </template>
    </cl-popup>
    <cl-popup content="click" trigger="click">
      <template #reference>
        <cl-button>click</cl-button>
      </template>
    </cl-popup>
    <cl-popup content="munual" trigger="manual" v-model="show">
      <template #reference>
        <cl-button @click="show = !show">manual</cl-button>
      </template>
    </cl-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<style lang="scss" scoped>
@import './popup-demo.scss';
</style>
