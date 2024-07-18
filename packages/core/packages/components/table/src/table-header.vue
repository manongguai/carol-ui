<template>
  <thead>
    <tr>
      <th>
        <div>Name</div>
      </th>
      <th>
        <div>Age</div>
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
