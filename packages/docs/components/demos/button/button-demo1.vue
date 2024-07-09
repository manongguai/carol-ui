<script lang="ts"></script>
<template>
  <div>
    <div class="row">
      <cl-button>Default</cl-button>
      <cl-button type="primary">Primary</cl-button>
      <cl-button type="secondary">Secondary</cl-button>
      <cl-button type="minor">Minor</cl-button>
      <cl-button type="dashed">Dashed</cl-button>
    </div>
    <br />
    <div class="row">
      <cl-button type="link">Link</cl-button>
      <cl-button type="text">Text</cl-button>
      <cl-button type="underlined">Underlined</cl-button>
    </div>
  </div>
</template>
<style scoped>
.row {
  display: flex;
  .cl-button {
    margin-right: 8px;
  }
}
</style>
