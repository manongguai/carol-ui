<template>
  <div class="row">
    <cl-input v-model="form.name">
      <template #prefix>
        <cl-icon iconName="cl-icon-yonghu"></cl-icon>
      </template>
      <template #suffix>
        <cl-icon iconName="cl-icon-add"></cl-icon>
      </template>
    </cl-input>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({
  name: 'Carol',
  age: 18
})
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  .tips {
    display: block;
  }
  .cl-input {
    margin-top: 12px;
  }
}
</style>
