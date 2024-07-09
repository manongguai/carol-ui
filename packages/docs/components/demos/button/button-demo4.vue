<script lang="ts"></script>
<template>
  <div>
    <div class="row">
      <cl-button type="default">Default Button</cl-button>
      <cl-button type="secondary" scene="info">Info Secondary Button</cl-button>
      <cl-button type="minor" scene="warning">Warning Minor Button</cl-button>
    </div>
    <br />
    <div class="row">
      <cl-button type="text" scene="info">Text Info Button</cl-button>
      <cl-button type="link" scene="warning">Link Warnging Button</cl-button>
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
