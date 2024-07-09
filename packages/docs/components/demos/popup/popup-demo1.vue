<template>
  <div class="row">
    <cl-popup content="我是最普通的调用方式">
      <template #reference>
        <cl-button>普通用法</cl-button>
      </template>
    </cl-popup>
    <cl-popup
      :virtualRef="buttonRef"
      content="虚拟元素触发，这个功能就很适合使用在触发元素和展示内容元素是分开的场景"
    >
    </cl-popup>
    <cl-button ref="buttonRef">virtualRef用法</cl-button>
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, ref } from 'vue'
const buttonRef = ref<ComponentPublicInstance<HTMLElement> | null>(null)
</script>

<style lang="scss" scoped>
@import './popup-demo.scss';
</style>
