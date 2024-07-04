<template>
  <cl-form :inline="true" :model="formInline" class="demo-form-inline">
    <cl-form-item label="Approved by">
      <cl-input v-model="formInline.user" placeholder="Approved by" clearable />
    </cl-form-item>
    <cl-form-item label="Activity zone">
      <cl-select
        v-model="formInline.region"
        placeholder="Activity zone"
        clearable
      >
        <cl-option label="Zone one" value="shanghai" />
        <cl-option label="Zone two" value="beijing" />
      </cl-select>
    </cl-form-item>
    <cl-form-item label="Activity time">
      <cl-date-picker
        v-model="formInline.date"
        type="date"
        placeholder="Pick a date"
        clearable
      />
    </cl-form-item>
    <cl-form-item>
      <cl-button type="primary" @click="onSubmit">Query</cl-button>
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
