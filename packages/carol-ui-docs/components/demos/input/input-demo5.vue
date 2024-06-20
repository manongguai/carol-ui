<template>
  <div class="row">
    <div>
      <cl-input v-model="form.password1" type="password" />
    </div>
    <div>
      <cl-input v-model="form.password2" type="password" :visibilityToggle="false" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({
  password1: '念念',
  password2: '11'
})
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  .cl-input {
    margin-top: 12px;
  }
}
</style>
