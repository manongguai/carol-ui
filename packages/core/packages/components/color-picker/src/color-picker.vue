<template>
  <div class="cl-color-picker" :style="cssVars">
    <cl-popup
      popupClass="cl-color-picker-custom—popup"
      v-model="panelVisible"
      effect="light"
      trigger="manual"
      :preRender="true"
      :visibleArrow="false"
      :outsideAutoCloseWithManual="true"
      placement="bottom-start"
    >
      <template #reference>
        <color-content
          ref="popRef"
          :size="mergeSize"
          @panelVisibleChange="panelVisibleChange"
          :disabled="disabled"
          @reset="colorReset"
          v-model="hexValue"
          :showResetButton="showResetButton"
          :showColorInput="showColorInput"
          :showColorIcon="showColorIcon"
        >
        </color-content>
      </template>
      <template #content>
        <color-panel
          ref="referenceRef"
          v-if="panelVisible"
          @colorSave="colorSave"
          :predefine="predefine"
          v-model="hexValue"
        >
        </color-panel>
      </template>
    </cl-popup>
  </div>
</template>

<script lang="ts">
import {
  type CSSProperties,
  computed,
  defineComponent,
  ref,
  type Ref,
  nextTick,
  watch,
  onMounted,
  type ComputedRef
} from 'vue'
import { colorPickerEmits, colorPickerProps, type Size } from './color-picker'
import useTheme from '@/hooks/use-theme'
import { colorPickerLight } from '../styles/light'
import ClPopup from '@/components/popup'
import ColorContent from './components/colorContent.vue'
import ColorPanel from './components/colorPanel.vue'
import { validHexString, getHexValueFromString } from './util'
import { useFormSize } from '@/hooks/use-form-props'
export default defineComponent({
  name: 'ClColorPicker',
  props: colorPickerProps,
  emits: colorPickerEmits,
  components: { ClPopup, ColorContent, ColorPanel },
  setup(props, { emit }) {
    const colorPickerRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()
    const hexValue = ref<string>('')
    // 初始绑定的色值，用于重置
    const sourceValue = ref(getHexValueFromString(props.modelValue))
    const panelVisible = ref(false)
    const popRef = ref<InstanceType<typeof ColorContent> | undefined>()
    const referenceRef = ref<InstanceType<typeof ColorPanel> | undefined>()
    const themeRef = useTheme('colorPicker', colorPickerLight)
    const formSize = useFormSize()
    const mergeSize = computed(() => {
      if (props.size) return props.size
      return formSize.value === 'small' ? 'small' : 'medium'
    })
    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self, common } = theme

      const colorProps = {
        '--cl-color-picker-disk-border-color': common.borderColor,
        '--cl-color-primary-color': common.primaryColor,
        '--cl-color-picker-reset-color': common.infoColor,
        '--cl-color-picker-disk-icon-color': common.textColor4,
        '--cl-color-picker-disk-icon-bg-color': common.bgColor1,
        '--cl-color-picker-disk-icon-hover-bg-color': common.bgColor4,
        '--cl-text-color-disabled': common.textColorDisabled,
        '--cl-bg-color': common.bgColor0
      }

      const fontProps = {
        '--cl-font-size-medium': common.fontSizeMedium,
        '--cl-font-size-small': common.fontSizeSmall
      }
      return {
        ...fontProps,
        ...colorProps
      }
    })
    //  重置颜色
    function colorReset() {
      hexValue.value = validHexString(props.resetColor) || sourceValue.value
      emit('reset')
    }
    function emitUpdateValue(value: string) {
      if (value == props.modelValue) return
      emit('update:modelValue', '#' + value)
      emit('change', '#' + value)
    }
    function colorSave() {
      panelVisible.value = false
    }
    //   点击显隐色板
    function panelVisibleChange() {
      panelVisible.value = !panelVisible.value
    }
    watch(
      () => props.modelValue,
      (v) => {
        hexValue.value = getHexValueFromString(v)
      },
      { immediate: true }
    )
    watch(hexValue, (v) => {
      emitUpdateValue(v)
    })
    return {
      cssVars: cssVarsRef,
      colorPickerRef,
      hexValue,
      panelVisible,
      panelVisibleChange,
      colorReset,
      popRef,
      referenceRef,
      colorSave,
      mergeSize
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/color-picker.scss';
</style>
