<template>
  <cl-form ref="formRef" :model="{ form }">
    <cl-form-item label="名称" required>
      <cl-input v-model="form.name"></cl-input>
    </cl-form-item>
    <cl-form-item>
      <div>
        <cl-button type="primary" @click="submitForm">提交</cl-button>
        <cl-button @click="resetForm">重置</cl-button>
      </div>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { type ClFormInstance } from '@/components/form/src/form'
const formRef = ref<ClFormInstance>()
const form = ref({
  name: ''
})
const submitForm = () => {
  formRef.value!.validate((valid) => {
    console.log(valid)
  })
}
const resetForm = () => {
  formRef.value!.resetFields()
}
</script>

<style scoped lang="scss"></style>
