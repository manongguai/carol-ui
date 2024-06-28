<template>
  <div class="row">
    <cl-popup placement="top-center" content="top-center">
      <template #reference>
        <cl-button>arrow-offset：0</cl-button>
      </template>
    </cl-popup>
    <cl-popup placement="top-center" :arrow-offset="5" content="top-center">
      <template #reference>
        <cl-button>arrow-offset：5</cl-button>
      </template>
    </cl-popup>
    <cl-popup placement="top-center" :arrow-offset="500" content="top-center">
      <template #reference>
        <cl-button>arrow-offset：500</cl-button>
      </template>
    </cl-popup>
    <cl-popup placement="top-center" :visible-arrow="false" content="top-center">
      <template #reference>
        <cl-button>隐藏箭头</cl-button>
      </template>
    </cl-popup>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './popup-demo.scss';
</style>
