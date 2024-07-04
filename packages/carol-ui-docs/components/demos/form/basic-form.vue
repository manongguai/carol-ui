<template>
  <cl-form :model="form" label-width="120px">
    <cl-form-item label="Activity name">
      <cl-input v-model="form.name" />
    </cl-form-item>
    <cl-form-item label="Activity zone">
      <cl-select v-model="form.region" placeholder="please select your zone">
        <cl-option label="Zone one" value="shanghai" />
        <cl-option label="Zone two" value="beijing" />
      </cl-select>
    </cl-form-item>
    <cl-form-item label="Activity time">
      <cl-col :span="11">
        <cl-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
      </cl-col>
      <cl-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </cl-col>
      <cl-col :span="11">
        <cl-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
      </cl-col>
    </cl-form-item>
    <cl-form-item label="Instant delivery">
      <cl-switch v-model="form.delivery" />
    </cl-form-item>
    <cl-form-item label="Activity type">
      <cl-checkbox-group v-model="form.type">
        <cl-checkbox label="Online activities" name="type" />
        <cl-checkbox label="Promotion activities" name="type" />
        <cl-checkbox label="Offline activities" name="type" />
        <cl-checkbox label="Simple brand exposure" name="type" />
      </cl-checkbox-group>
    </cl-form-item>
    <cl-form-item label="Resources">
      <cl-radio-group v-model="form.resource">
        <cl-radio label="Sponsor" />
        <cl-radio label="Venue" />
      </cl-radio-group>
    </cl-form-item>
    <cl-form-item label="Activity form">
      <cl-input v-model="form.desc" type="textarea" />
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
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
});

const onSubmit = () => {
  console.log("submit!");
};
</script>
