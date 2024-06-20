<script setup lang="ts">
const icons = [
  "cl-icon-wancheng",
  "cl-icon-jinxingzhong",
  "cl-icon-arrow-right",
  "cl-icon-arrow-left",
  "cl-icon-arrow-double-left",
  "cl-icon-arrow-double-right",
  "cl-icon-close",
  "cl-icon-info",
  "cl-icon-success",
  "cl-icon-warning",
  "cl-icon-reset",
  "cl-icon-mingwen",
  "cl-icon-hide",
  "cl-icon-add",
  "cl-icon-subtract",
  "cl-icon-yonghu",
  "cl-icon-arrow-down",
  "cl-icon-error",
  "cl-icon-arrow-up",
  "cl-icon-circle-close",
  "cl-icon-loading"
];
</script>
<template>
  <div class="icons">
    <cl-icon v-for="icon in icons" class="icon-item" :iconName="icon"  ></cl-icon>
  </div>
</template>

<style lang="scss">
.icons{
  display: flex;
  flex-wrap: wrap;
  font-size: 28px;
  width: 100%;
  .icon-item{
    flex-basis: 8%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
