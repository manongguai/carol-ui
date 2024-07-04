<template>
  <div>
    <cl-radio-group v-model="size" label="size control">
      <cl-radio-button label="large">large</cl-radio-button>
      <cl-radio-button label="default">default</cl-radio-button>
      <cl-radio-button label="small">small</cl-radio-button>
    </cl-radio-group>
    <cl-radio-group v-model="labelPosition" label="position control">
      <cl-radio-button label="left">Left</cl-radio-button>
      <cl-radio-button label="right">Right</cl-radio-button>
      <cl-radio-button label="top">Top</cl-radio-button>
    </cl-radio-group>
  </div>
  <br />
  <cl-form
    ref="form"
    :model="sizeForm"
    label-width="auto"
    :label-position="labelPosition"
    :size="size"
  >
    <cl-form-item label="Activity name">
      <cl-input v-model="sizeForm.name" />
    </cl-form-item>
    <cl-form-item label="Activity zone">
      <cl-select
        v-model="sizeForm.region"
        placeholder="please select your zone"
      >
        <cl-option label="Zone one" value="shanghai" />
        <cl-option label="Zone two" value="beijing" />
      </cl-select>
    </cl-form-item>
    <cl-form-item label="Activity time">
      <cl-col :span="11">
        <cl-date-picker
          v-model="sizeForm.date1"
          type="date"
          label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </cl-col>
      <cl-col class="text-center" :span="1" style="margin: 0 0.5rem">-</cl-col>
      <cl-col :span="11">
        <cl-time-picker
          v-model="sizeForm.date2"
          label="Pick a time"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </cl-col>
    </cl-form-item>
    <cl-form-item label="Activity type">
      <cl-checkbox-group v-model="sizeForm.type">
        <cl-checkbox-button label="Online activities" name="type" />
        <cl-checkbox-button label="Promotion activities" name="type" />
      </cl-checkbox-group>
    </cl-form-item>
    <cl-form-item label="Resources">
      <cl-radio-group v-model="sizeForm.resource">
        <cl-radio border label="Sponsor" />
        <cl-radio border label="Venue" />
      </cl-radio-group>
    </cl-form-item>
    <cl-form-item>
      <cl-button type="primary" @click="onSubmit">Create</cl-button>
      <cl-button>Cancel</cl-button>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const size = ref('default')
const labelPosition = ref('right')

const sizeForm = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

function onSubmit() {
  console.log('submit!')
}
</script>

<style>
.el-radio-group {
  margin-right: 12px;
}
</style>
