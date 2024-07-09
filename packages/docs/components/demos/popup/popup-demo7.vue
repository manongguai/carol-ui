<template>
  <div class="row">
    <cl-popup placement="top-center" :offset="20" content="top-center">
      <template #reference>
        <cl-button>top-center</cl-button>
      </template>
    </cl-popup>
    <cl-popup placement="bottom-center" :offset="20" content="bottom-center">
      <template #reference>
        <cl-button>bottom-center</cl-button>
      </template>
    </cl-popup>

    <cl-popup placement="left-center" :offset="20" content="left-center">
      <template #reference>
        <cl-button>left-center</cl-button>
      </template>
    </cl-popup>
    <cl-popup placement="right-center" :offset="20" content="right-center">
      <template #reference>
        <cl-button>right-center</cl-button>
      </template>
    </cl-popup>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './popup-demo.scss';
</style>
