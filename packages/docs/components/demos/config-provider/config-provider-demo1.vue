<script setup lang="ts">
import { ref } from 'vue'
const themeOverrides = ref({
  common: {},
  button: {
    color: 'red'
  }
})

const themeOverrides1 = ref({
  button: {
    color: 'orange'
  }
})

const themeOverrides2 = ref({
  button: {
    color: 'yellow'
  }
})
</script>
<template>
  <div>
    <div>
      <cl-config-provider :themeOverrides="themeOverrides">
        <cl-button size="small">Btn with color override</cl-button>
      </cl-config-provider>
    </div>
    <br />
    <div>
      <cl-config-provider :themeOverrides="themeOverrides1">
        <div>
          <cl-button size="small">Btn1 with color override</cl-button>
        </div>
        <br />
        <div>
          <cl-config-provider :themeOverrides="themeOverrides2">
            <cl-button>Btn2 with color override</cl-button>
          </cl-config-provider>
        </div>
      </cl-config-provider>
    </div>
  </div>
</template>
