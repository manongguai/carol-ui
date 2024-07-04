<template>
  <cl-radio-group v-model="labelPosition" label="label position">
    <cl-radio-button label="left">Left</cl-radio-button>
    <cl-radio-button label="right">Right</cl-radio-button>
    <cl-radio-button label="top">Top</cl-radio-button>
  </cl-radio-group>
  <div style="margin: 20px" />
  <cl-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <cl-form-item label="Name">
      <cl-input v-model="formLabelAlign.name" />
    </cl-form-item>
    <cl-form-item label="Activity zone">
      <cl-input v-model="formLabelAlign.region" />
    </cl-form-item>
    <cl-form-item label="Activity form">
      <cl-input v-model="formLabelAlign.type" />
    </cl-form-item>
  </cl-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const labelPosition = ref('right')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
</script>
