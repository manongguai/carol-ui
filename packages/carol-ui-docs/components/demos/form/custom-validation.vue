<template>
  <cl-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80" class="demo-ruleForm">
    <cl-form-item label="Password" prop="pass">
      <cl-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </cl-form-item>
    <cl-form-item label="Confirm" prop="checkPass">
      <cl-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </cl-form-item>
    <cl-form-item label="Age" prop="age">
      <cl-input v-model.number="ruleForm.age" />
    </cl-form-item>
    <cl-form-item>
      <cl-button type="primary" @click="submitForm(ruleFormRef)">Submit</cl-button>
      <cl-button @click="resetForm(ruleFormRef)">Reset</cl-button>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "@kirkw/carol-ui";
import { reactive, ref } from "vue";

const ruleFormRef = ref<FormInstance>();

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the age"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"));
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"));
      } else {
        callback();
      }
    }
  }, 1000);
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  pass: "",
  checkPass: "",
  age: ""
});

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  age: [{ validator: checkAge, trigger: "blur" }]
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
