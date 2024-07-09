<template>
  <div class="row">
    <cl-popup placement="top-start">
      <template #content> 上 - 左 </template>
      <template #reference>
        <cl-button>上 - 左</cl-button>
      </template>
    </cl-popup>

    <cl-popup placement="top-center">
      <template #content> 上 - 中 </template>
      <template #reference>
        <cl-button>上 - 中</cl-button>
      </template>
    </cl-popup>

    <cl-popup placement="top-end">
      <template #content> 上 - 右 </template>
      <template #reference>
        <cl-button>上 - 右</cl-button>
      </template>
    </cl-popup>
  </div>

  <div class="row">
    <cl-popup placement="left-start">
      <template #content> 左 - 上 </template>
      <template #reference>
        <cl-button>左 - 上</cl-button>
      </template>
    </cl-popup>

    <cl-popup placement="left-center">
      <template #content> 左 - 中 </template>
      <template #reference> <cl-button>左 - 中</cl-button> </template>
    </cl-popup>

    <cl-popup placement="left-end">
      <template #content> 左 - 下 </template>
      <template #reference>
        <cl-button>左 - 下</cl-button>
      </template>
    </cl-popup>
  </div>

  <div class="row">
    <cl-popup placement="right-start">
      <template #content> 右 - 上 </template>
      <template #reference>
        <cl-button>右 - 上</cl-button>
      </template>
    </cl-popup>

    <cl-popup placement="right-center">
      <template #content> 右 - 中 </template>
      <template #reference>
        <cl-button>右 - 中</cl-button>
      </template>
    </cl-popup>

    <cl-popup placement="right-end">
      <template #content> 右 - 下 </template>
      <template #reference>
        <cl-button>右 - 下</cl-button>
      </template>
    </cl-popup>
  </div>

  <div class="row">
    <cl-popup placement="bottom-start">
      <template #content> 下 - 左 </template>
      <template #reference>
        <cl-button>下 - 左</cl-button>
      </template>
    </cl-popup>

    <cl-popup placement="bottom-center">
      <template #content> 下 - 中 </template>
      <template #reference>
        <cl-button>下 - 中</cl-button>
      </template>
    </cl-popup>

    <cl-popup placement="bottom-end">
      <template #content> 下 - 右 </template>
      <template #reference>
        <cl-button>下 - 右</cl-button>
      </template>
    </cl-popup>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './popup-demo.scss';
</style>
