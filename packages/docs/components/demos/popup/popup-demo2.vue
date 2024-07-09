<template>
  <div class="row">
    <cl-popup content="light">
      <template #reference>
        <cl-button>light</cl-button>
      </template>
    </cl-popup>
    <cl-popup effect="dark" content="dark">
      <template #reference>
        <cl-button>dark</cl-button>
      </template>
    </cl-popup>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './popup-demo.scss';
</style>
