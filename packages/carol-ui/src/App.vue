<script setup lang="ts">
import ClButtonGroup from '@/components/button-group'
import clIcon from '../packages/components/icon'
import clConfigProvider from '../packages/components/config-provider'
import { rgba, composite, scaleColor } from 'seemly'
import { ref, resolveDirective } from 'vue'
import type { Scene, Size, Type } from '../packages/components/button/src/button'
import type { GlobalTheme } from '../packages/components/config-provider/src/config-provider'
import type { ThemeCommonVars } from '../packages/styles'
// import type { Type, Scene, Size } from '../packages/components/button'
const baseBackgroundRgb = rgba('#FFF')
const baseInvertBackgroundRgb = rgba('#000')
const themeOverrides = ref({
  common: {},
  button: {
    color: 'red'
  }
})
const baseRgb = rgba('#fafbfd')
const disabled = ref(false)
const type = ref<Type>('primary')
const scene = ref<Scene>('normal')
const size = ref<Size>('small')
const iconColor = ref('blue')
const color = ref('#000')

function neutral(alpha: string | number) {
  const overlayRgba = Array.from(baseInvertBackgroundRgb)
  overlayRgba[3] = Number(alpha)
  return composite(baseBackgroundRgb, overlayRgba as [number, number, number, number])
}

const test = () => {
  console.log('.... in Test...', baseRgb, neutral('0.24'))
  themeOverrides.value.button.color = 'blue'
  // disabled.value = !disabled.value;
  type.value = 'minor'
  // scene.value = 'info';
  size.value = 'medium'
  iconColor.value = 'red'
}

const testMe = () => {
  console.log('.... clicked me...')
}
</script>

<template>
  <div>
    <div>Test</div>
    <button @click="test">ClickMe</button>
    <div>------------</div>
    <cl-config-provider>
      <cl-button-group size="small">
        <cl-button @click="testMe">Btn Test</cl-button>
        <cl-button>Btn Default</cl-button>
      </cl-button-group>
    </cl-config-provider>
    <br />
    <cl-config-provider :themeOverrides="themeOverrides">
      <cl-button :size="size" @click="testMe">Btn Test 2</cl-button>
    </cl-config-provider>
    <cl-color-picker v-model="color"></cl-color-picker>
  </div>
</template>

<style scoped></style>
