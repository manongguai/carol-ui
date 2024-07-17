<template>
  <div>
    <cl-table :data="data">
      <cl-table-column prop="name" width="200" label="Name"> </cl-table-column>
      <cl-table-column prop="age" min-width="300" label="Age"> </cl-table-column>
    </cl-table>

    <cl-table :data="data">
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
  }
])
</script>

<style></style>
