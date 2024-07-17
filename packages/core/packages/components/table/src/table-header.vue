<template>
  <table class="cl-table__header">
    <hColgroup :columns="columns" tableLayout="auto"></hColgroup>
  </table>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { tableInjectionKey } from './context'
import { hColgroup } from './h-helper'
const tableContext = inject(tableInjectionKey)

const columns = computed(() => tableContext?.store.columns.value || [])
</script>

<style scoped lang="scss"></style>
