<template>
  <cl-form ref="formRef" :rules="rules" :model="{ form }">
    <cl-form-item label="名称" prop="name">
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
import { reactive, ref } from 'vue'
import { type ClFormInstance } from '@/components/form/src/form'
const formRef = ref<ClFormInstance>()
const form = ref({
  name: ''
})
const rules = reactive({
  name: [
    {
      required: true,
      message: '名称不能为空',
      trigger: 'blur'
    }
  ]
})
const submitForm = () => {
  formRef.value!.validate((valid, fields) => {
    console.log(valid, fields)
  })
}
const resetForm = () => {
  formRef.value!.resetFields()
}
</script>

<style scoped lang="scss"></style>
