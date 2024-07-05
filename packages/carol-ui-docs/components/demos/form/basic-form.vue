<template>
  <cl-form :model="form" label-width="120px">
    <cl-form-item label="name">
      <cl-input v-model="form.name" />
    </cl-form-item>
    <cl-form-item label="desc">
      <cl-input v-model="form.desc" type="textarea" />
    </cl-form-item>
    <cl-form-item label="count">
      <cl-input-number v-model="form.count" />
    </cl-form-item>
    <cl-form-item label="color">
      <cl-color-picker v-model="form.color" />
    </cl-form-item>
    <cl-form-item>
      <cl-button type="primary" @click="onSubmit">Create</cl-button>
      <cl-button>Cancel</cl-button>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "",
  count: "",
  color: "",
  desc: ""
});

const onSubmit = () => {
  console.log("submit!");
};
</script>
