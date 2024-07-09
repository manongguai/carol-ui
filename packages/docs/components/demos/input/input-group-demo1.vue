<template>
  <cl-input-group style="width: 240px">
    <cl-input v-model="data.value1" />
    <span>元</span>
  </cl-input-group>
  <br /><br />
  <cl-input-group style="width: 240px">
    <cl-input v-model="data.value2" />
    <span>至</span>
    <cl-input-number v-model="data.value3" />
  </cl-input-group>
  <br /><br />
  <cl-input-group style="width: 240px">
    <cl-input v-model="data.value4" />
    <span style="z-index: 1; border-left-color: #fff; border-right-color: #fff">～</span>
    <cl-input-number v-model="data.value5" />
  </cl-input-group>
  <br /><br />
  <cl-input-group style="width: 240px">
    <cl-input v-model="data.value6" />
    <span style="border: none">～</span>
    <cl-input-number v-model="data.value7" />
  </cl-input-group>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
  value6: '',
  value7: ''
})
</script>
