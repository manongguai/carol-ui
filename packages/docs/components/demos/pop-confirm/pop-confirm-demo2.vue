<template>
  <div class="row">
    <cl-pop-confirm hideIcon hideConfirm hideCancel>
      <template #reference>
        <cl-button>普通用法</cl-button>
      </template>
      <template #content>
        <table>
          <tr>
            <td>缸号</td>
            <td>卷数</td>
            <td>数量</td>
          </tr>
          <tr>
            <td>11</td>
            <td>10</td>
            <td>100</td>
          </tr>
          <tr>
            <td>12</td>
            <td>10</td>
            <td>100</td>
          </tr>
        </table>
      </template>
      <template #title>
        <div>明细</div>
      </template>
    </cl-pop-confirm>
    <cl-pop-confirm :virtualRef="buttonRef" hideIcon hideConfirm hideCancel>
      <template #reference>
        <cl-button>80</cl-button>
      </template>
      <template #content>
        <table>
          <tr>
            <td>缸号</td>
            <td>卷数</td>
            <td>数量</td>
          </tr>
          <tr>
            <td>11</td>
            <td>10</td>
            <td>100</td>
          </tr>
          <tr>
            <td>12</td>
            <td>10</td>
            <td>100</td>
          </tr>
        </table>
      </template>
      <template #title>
        <div>明细</div>
      </template>
    </cl-pop-confirm>
    <cl-button ref="buttonRef">virtualRef用法</cl-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const buttonRef = ref<HTMLElement | null>(null)
</script>

<style lang="scss" scoped>
@import '../popup/popup-demo.scss';
table {
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
}
tr {
  border-top: 1px solid #dfe2e5;
}

tr:nth-child(2n) {
  background-color: #f6f8fa;
}

td,
th {
  border: 1px solid #dfe2e5;
  padding: 0.6em 1em;
}
</style>
