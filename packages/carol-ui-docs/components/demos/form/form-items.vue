<template>
  <cl-form
    ref="formRef"
    :model="dynamicValidateForm"
    label-width="80px"
    class="demo-dynamic"
  >
    <cl-form-item
      prop="email"
      label="Email"
      :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <cl-input v-model="dynamicValidateForm.email" />
    </cl-form-item>
    <cl-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="'Domain' + index"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
    >
      <cl-input v-model="domain.value" />
      <cl-button class="mt-2" @click.prevent="removeDomain(domain)"
        >Delete</cl-button
      >
    </cl-form-item>
    <cl-form-item>
      <cl-button type="primary" @click="submitForm(formRef)">Submit</cl-button>
      <cl-button @click="addDomain">New domain</cl-button>
      <cl-button @click="resetForm(formRef)">Reset</cl-button>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { FormInstance } from '@kirkw/carol-ui';
import { reactive, ref } from 'vue'
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
})

interface DomainItem {
  key: number
  value: string
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  })
}

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
