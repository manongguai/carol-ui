<template>
  <div>
    <cl-button-group v-model="size" label="size control">
      <cl-button label="large" @click="size = 'large'">large</cl-button>
      <cl-button label="medium" @click="size = 'medium'">medium</cl-button>
      <cl-button label="small" @click="size = 'small'">small</cl-button>
    </cl-button-group>
    <cl-button-group style="margin-left: 10px" v-model="labelPosition" label="position control">
      <cl-button label="left" @click="labelPosition = 'left'">Left</cl-button>
      <cl-button label="right" @click="labelPosition = 'right'">Right</cl-button>
      <cl-button label="top" @click="labelPosition = 'top'">Top</cl-button>
    </cl-button-group>
  </div>
  <br />
  <cl-form ref="form" :model="sizeForm" label-width="140px" :label-position="labelPosition" :size="size">
    <cl-form-item label="Activity name">
      <cl-input v-model="sizeForm.name" />
    </cl-form-item>
    <cl-form-item>
      <cl-button type="primary" @click="onSubmit">Create</cl-button>
      <cl-button>Cancel</cl-button>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const size = ref("medium");
const labelPosition = ref("right");

const sizeForm = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
});

function onSubmit() {
  console.log("submit!");
}
</script>

<style>
.cl-radio-group {
  margin-right: 12px;
}
</style>
