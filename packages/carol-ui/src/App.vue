<template>
  <cl-row>
    <cl-col :span="24"><div class="grid-content ep-bg-purple-dark" /></cl-col>
  </cl-row>
  <cl-row>
    <cl-col :span="12"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="12"><div class="grid-content ep-bg-purple-light" /></cl-col>
  </cl-row>
  <cl-row>
    <cl-col :span="8"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="8"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="8"><div class="grid-content ep-bg-purple" /></cl-col>
  </cl-row>
  <cl-row>
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="6"><div class="grid-content ep-bg-purple-light" /></cl-col>
  </cl-row>
  <cl-row>
    <cl-col :span="4"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="4"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="4"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="4"><div class="grid-content ep-bg-purple-light" /></cl-col>
    <cl-col :span="4"><div class="grid-content ep-bg-purple" /></cl-col>
    <cl-col :span="4"><div class="grid-content ep-bg-purple-light" /></cl-col>
  </cl-row>
</template>

<style lang="scss">
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
.ep-bg-purple {
  background: #000;
}
.ep-bg-purple-light {
  background-color: #ccc;
}
</style>
