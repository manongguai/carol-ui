<template>
  <cl-popup content="我是长文本，很长的文本，非常长长长长长长长长长">
    <template #reference> 【不处理超出】我是长文本，很长的文本，非常长长长长长长长长长。 </template>
  </cl-popup>
  <cl-popup content="【超出提示】我是长文本，很长的文本，非常长长长长长长长长长。" :txtOverLine="1">
    <template #reference>
      <p style="max-width: 300px">【超出提示】我是长文本，很长的文本，非常长长长长长长长长长。</p>
    </template>
  </cl-popup>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './popup-demo.scss';
</style>
