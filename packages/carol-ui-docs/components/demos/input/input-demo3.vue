<template>
  <div class="row">
    <div>
      <div>
        <cl-input ref="inputRef" v-model="data.value1" />
        <cl-button @click="getFocus">点击获取焦点</cl-button>
      </div>
      <div>
        <cl-input ref="input1Ref" v-model="data.value2" />
        <cl-button @click="blurFocus">点击失去焦点</cl-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const inputRef = ref<HTMLElement | null>(null)
const input1Ref = ref<HTMLElement | null>(null)
const data = reactive({
  value1: '',
  value2: ''
})
const getFocus = () => {
  inputRef?.value?.focus()
}
const blurFocus = () => {
  input1Ref?.value?.blur()
}
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  .cl-input {
    margin-top: 12px;
  }
  .cl-button {
    margin-left: 12px;
  }
}
</style>
