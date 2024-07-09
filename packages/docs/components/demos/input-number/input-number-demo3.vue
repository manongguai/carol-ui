<template>
  <div class="wrap">
    <span class="tips">数字限制</span>
    <span class="tips">precision 的值必须是一个非负整数，并且不能小于 step 的小数位数</span>
    <div class="row">
      <div>
        <span class="tips">正整数</span>
        <cl-input-number v-model="form.num1" :min="0" :step="1" :precision="0" />
      </div>
      <div>
        <span class="tips">正数且是两位小数</span>
        <cl-input-number v-model="form.num2" :min="0" :step="0.1" :precision="2" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const nameRef = (ref < HTMLElement) | (null > null)
const specialRef = (ref < HTMLElement) | (null > null)
const form = reactive({
  num1: 0,
  num2: 0.01
})
// todo
const getFocus = () => {
  nameRef.value && nameRef.value.focus()
}
// todo
const blurFocus = () => {
  specialRef.value && specialRef.value.focus()
}
</script>
<style lang="scss" scoped>
.wrap {
  .row {
    display: flex;
    justify-content: space-between;
  }
  .tips {
    display: block;
  }
  .cl-input {
    margin-top: 12px;
  }
}
</style>
