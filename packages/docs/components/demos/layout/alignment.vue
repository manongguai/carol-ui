<template>
  <cl-row class="row-bg">
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
  </cl-row>
  <cl-row class="row-bg" justify="center">
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
  </cl-row>
  <cl-row class="row-bg" justify="end">
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
  </cl-row>
  <cl-row class="row-bg" justify="space-between">
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
  </cl-row>
  <cl-row class="row-bg" justify="space-around">
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
  </cl-row>
  <cl-row class="row-bg" justify="space-evenly">
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
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
