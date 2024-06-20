<script setup lang="ts">
import { GameControllerOutline, GameController } from "@vicons/ionicons5";
</script>
<template>
  <div class="icons">
    <cl-icon class="icon-item">
      <GameControllerOutline></GameControllerOutline>
    </cl-icon>
    <cl-icon class="icon-item" color="#0e7a0d">
      <GameController></GameController>
    </cl-icon>
    <cl-icon class="icon-item">
      <GameController></GameController>
    </cl-icon>
  </div>
</template>

<style lang="scss">
.icons {
  display: flex;
  flex-wrap: wrap;
  font-size: 28px;
  width: 100%;
  .icon-item {
    flex-basis: 8%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
