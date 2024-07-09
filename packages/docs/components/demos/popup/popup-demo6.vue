<template>
  <div class="row">
    <cl-popup :openDelay="0" content="我是立即出现', openDelay: 0">
      <template #reference>
        <cl-button>立即出现</cl-button>
      </template>
    </cl-popup>
    <cl-popup :closeDelay="0" content="我是立即隐藏', closeDelay: 0">
      <cl-button>立即隐藏</cl-button>
      <template #reference>
        <cl-button>立即隐藏</cl-button>
      </template>
    </cl-popup>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './popup-demo.scss';
</style>
