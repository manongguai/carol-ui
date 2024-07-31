<template>
  <tbody tabindex="-1" class="">
    <tr :class="getRowCls(index)" v-for="(row, index) in data" :key="index">
      <td class="cl-table__cell" v-for="(column, cIndex) in columns" :key="cIndex">
        <div style="text-align: left" class="cell">
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
const stripe = computed(() => tableContext?.stripe)

const getRowCls = (rowIndex: number) => {
  return [
    'cl-table__row',
    {
      'cl-table__row--striped': stripe.value && rowIndex % 2 === 1
    }
  ]
}
</script>

<style scoped lang="scss"></style>
