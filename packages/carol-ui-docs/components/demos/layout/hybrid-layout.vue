<template>
  <cl-row :gutter="20">
    <cl-col :span="16"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="8"><div class="grid-content ep-bg-purple" /></cl-col>
  </cl-row>
  <cl-row :gutter="20">
    <cl-col :span="8"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="8"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="4"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="4"><div class="grid-content ep-bg-purple" /></cl-col>
  </cl-row>
  <cl-row :gutter="20">
    <cl-col :span="4"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="16"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="4"><div class="grid-content ep-bg-purple" /></cl-col>
  </cl-row>
</template>

<style>
.cl-row {
  margin-bottom: 20px;
}
.cl-row:last-child {
  margin-bottom: 0;
}
.cl-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
