<template>
  <div class="row">
    <cl-popup :modelValue="true" content="top-center">
      <template #reference>
        <cl-button>初始显示,状态可用</cl-button>
      </template>
    </cl-popup>
    <cl-popup :modelValue="true" disabled content="top-center">
      <template #reference>
        <cl-button>初始显示,状态不可用</cl-button>
      </template>
    </cl-popup>
    <cl-popup disabled content="top-center">
      <template #reference>
        <cl-button>初始隐藏，状态不可用</cl-button>
      </template>
    </cl-popup>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './popup-demo.scss';
</style>
