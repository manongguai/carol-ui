<template>
  <div>
    <cl-table style="width: 1000px; margin: 0 auto" :data="data">
      <cl-table-column prop="name" label="Name"> </cl-table-column>
      <cl-table-column prop="age" label="Age"> </cl-table-column>
      <cl-table-column prop="name" label="Name"> </cl-table-column>
      <cl-table-column prop="age" label="Age"> </cl-table-column>
      <cl-table-column prop="name" label="Name"> </cl-table-column>
      <cl-table-column prop="age" label="Age"> </cl-table-column>
      <cl-table-column prop="name" label="Name"> </cl-table-column>
      <cl-table-column prop="age" label="Age"> </cl-table-column>
      <cl-table-column prop="name" label="Name"> </cl-table-column>
      <cl-table-column prop="age" label="Age"> </cl-table-column>

      <cl-table-column prop="name" label="Name"> </cl-table-column>
      <cl-table-column prop="age" label="Age"> </cl-table-column>
      <cl-table-column prop="name" label="Name"> </cl-table-column>
      <cl-table-column prop="age" label="Age"> </cl-table-column>
    </cl-table>

    <cl-table style="width: 1000px; margin: 0 auto" :data="data">
      <cl-table-column prop="name" label="Name"> </cl-table-column>
    </cl-table>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import ClTable from '../packages/components/table'
const data = ref([
  {
    name: 'Alice',
    age: 25
  },
  {
    name: 'Bob',
    age: 30
  },
  {
    name: 'Bob',
    age: 30
  }
])
</script>

<style></style>
