<template>
  <cl-table class="vp-raw" :data="tableData" style="width: 100%">
    <cl-table-column prop="date" label="Date" width="180" />
    <cl-table-column prop="name" label="Name" width="180" />
    <cl-table-column prop="address" label="Address" />
  </cl-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];
</script>
<style>
.vp-doc table {
  display: table;
  border-collapse: collapse;
  margin: 0;
  overflow-x: auto;
}
</style>
