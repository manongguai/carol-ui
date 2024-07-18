<template>
  <tbody class="">
    <tr v-for="(row, index) in data" :key="index">
      <td v-for="(column, cIndex) in columns" :key="cIndex">
        <div style="text-align: center">
          {{ row[column.prop] }}
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { tableInjectionKey } from './context'

const tableContext = inject(tableInjectionKey)

const columns = computed(() => tableContext?.store.columns.value || [])
const data = computed(() => tableContext?.data)
</script>

<style scoped lang="scss"></style>
