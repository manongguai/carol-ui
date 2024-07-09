<template>
  <cl-button-group label="label position">
    <cl-button @click="labelPosition='left'">Left</cl-button>
    <cl-button @click="labelPosition='right'">Right</cl-button>
    <cl-button @click="labelPosition='top'">Top</cl-button>
  </cl-button-group>
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
