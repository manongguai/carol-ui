<template>
  <cl-form
    ref="formRef"
    :model="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <cl-form-item
      label="age"
      prop="age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', message: 'age must be a number' },
      ]"
    >
      <cl-input
        v-model.number="numberValidateForm.age"
        type="text"
        autocomplete="off"
      />
    </cl-form-item>
    <cl-form-item>
      <cl-button type="primary" @click="submitForm(formRef)">Submit</cl-button>
      <cl-button @click="resetForm(formRef)">Reset</cl-button>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from '@kirkw/carol-ui'

const formRef = ref<FormInstance>()

const numberValidateForm = reactive({
  age: '',
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
