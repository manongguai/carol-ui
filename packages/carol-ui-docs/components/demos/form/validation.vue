<template>
  <cl-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <cl-form-item label="Activity name" prop="name">
      <cl-input v-model="ruleForm.name" />
    </cl-form-item>
    <cl-form-item label="Activity zone" prop="region">
      <cl-select v-model="ruleForm.region" placeholder="Activity zone">
        <cl-option label="Zone one" value="shanghai" />
        <cl-option label="Zone two" value="beijing" />
      </cl-select>
    </cl-form-item>
    <cl-form-item label="Activity count" prop="count">
      <cl-select-v2
        v-model="ruleForm.count"
        placeholder="Activity count"
        :options="options"
      />
    </cl-form-item>
    <cl-form-item label="Activity time" required>
      <cl-col :span="11">
        <cl-form-item prop="date1">
          <cl-date-picker
            v-model="ruleForm.date1"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </cl-form-item>
      </cl-col>
      <cl-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </cl-col>
      <cl-col :span="11">
        <cl-form-item prop="date2">
          <cl-time-picker
            v-model="ruleForm.date2"
            label="Pick a time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </cl-form-item>
      </cl-col>
    </cl-form-item>
    <cl-form-item label="Instant delivery" prop="delivery">
      <cl-switch v-model="ruleForm.delivery" />
    </cl-form-item>
    <cl-form-item label="Activity type" prop="type">
      <cl-checkbox-group v-model="ruleForm.type">
        <cl-checkbox label="Online activities" name="type" />
        <cl-checkbox label="Promotion activities" name="type" />
        <cl-checkbox label="Offline activities" name="type" />
        <cl-checkbox label="Simple brand exposure" name="type" />
      </cl-checkbox-group>
    </cl-form-item>
    <cl-form-item label="Resources" prop="resource">
      <cl-radio-group v-model="ruleForm.resource">
        <cl-radio label="Sponsorship" />
        <cl-radio label="Venue" />
      </cl-radio-group>
    </cl-form-item>
    <cl-form-item label="Activity form" prop="desc">
      <cl-input v-model="ruleForm.desc" type="textarea" />
    </cl-form-item>
    <cl-form-item>
      <cl-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </cl-button>
      <cl-button @click="resetForm(ruleFormRef)">Reset</cl-button>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>
