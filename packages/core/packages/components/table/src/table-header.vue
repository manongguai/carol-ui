<template>
  <thead>
    <tr>
      <th v-for="(column, index) in columns" :key="index">
        <div>{{ column.label }}</div>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { tableInjectionKey } from './context'
const tableContext = inject(tableInjectionKey)

const columns = computed(() => tableContext?.store.columns.value || [])
</script>

<style scoped lang="scss"></style>
