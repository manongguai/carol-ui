<template>
  <div class="row">
    <cl-pop-confirm
      @cancel="cancel"
      @confirm="confirm"
      title="确定删除订单？"
      content="此操作不可撤回，数据将不会保存。"
    >
      <template #reference>
        <cl-button>普通用法</cl-button>
      </template>
    </cl-pop-confirm>
    <cl-pop-confirm
      :openDelay="1000"
      :virtualRef="buttonRef"
      title="确定删除订单？"
      content="此操作不可撤回，数据将不会保存。"
    >
    </cl-pop-confirm>
    <cl-button ref="buttonRef">virtualRef用法</cl-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const buttonRef = ref<HTMLElement | null>(null)
function cancel() {
  console.log('cancel')
}
function confirm() {
  console.log('confirm')
}
</script>

<style lang="scss" scoped>
@import '../popup/popup-demo.scss';
</style>
