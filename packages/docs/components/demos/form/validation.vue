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
    <cl-form-item label="Activity form" prop="desc">
      <cl-input v-model="ruleForm.desc" type="textarea" />
    </cl-form-item>
    <cl-form-item>
      <cl-button type="primary" @click="submitForm(ruleFormRef)"> Create </cl-button>
      <cl-button @click="resetForm(ruleFormRef)">Reset</cl-button>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from "@kirkw/carol-ui";
import { reactive, ref } from "vue";
interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}

const formSize = ref("medium");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change"
    }
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change"
    }
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change"
    }
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change"
    }
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change"
    }
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change"
    }
  ],
  desc: [{ required: true, message: "Please input activity form", trigger: "blur" }]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}));
</script>
