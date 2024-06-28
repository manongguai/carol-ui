<template>
  <span
    :class="[
      'cl-input-number',
      'is-controls-' + layout,
      inputNumberDisabled && 'is-disabled',
      readonly && 'is-readonly'
    ]"
    @mouseenter="data.hovering = true"
    @mouseleave="data.hovering = false"
    :style="(cssVars as CSSProperties)"
  >
    <input
      ref="inputRef"
      class="cl-input-inner"
      v-bind="$attrs"
      v-model="data.currentValue"
      :readonly="readonly"
      :max="max"
      :min="min"
      :disabled="inputNumberDisabled"
      :placeholder="placeholderText"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.up.prevent="handleIncrease"
      @keydown.down.prevent="handleDecrease"
    />
    <span
      v-if="hasControls"
      :class="['cl-input-number-decrease', { 'is-disabled': minDisabled }]"
      @click="handleDecrease"
    >
      <cl-icon
        :iconName="`cl-icon-${layout === 'between' ? 'subtract' : 'arrow-down'}`"
        :color="cssVars['--cl-input-clear-color']?.toString()"
      ></cl-icon>
    </span>
    <span
      v-if="hasControls"
      :class="['cl-input-number-increase', { 'is-disabled': maxDisabled }]"
      @click="handleIncrease"
    >
      <cl-icon
        :iconName="`cl-icon-${layout === 'between' ? 'add' : 'arrow-up'}`"
        :color="cssVars['--cl-input-clear-color']?.toString()"
      ></cl-icon>
    </span>
    <span v-if="showClear" class="cl-input-suffix">
      <!-- 清空图标 -->
      <cl-icon
        iconName="cl-icon-circle-close"
        class="cl-input-clear"
        :color="cssVars['--cl-input-clear-color']?.toString()"
        @click.stop="clearClick"
      ></cl-icon>
      <slot name="suffix"></slot>
    </span>
  </span>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  computed,
  type CSSProperties,
  type Ref,
  toRefs
} from 'vue'
import { inputNumberProps, inputNumberEmits } from './input-number'
import useTheme from '@/hooks/use-theme'
import ClIcon from '@/components/icon'
import { isNumber } from '@kirkw/utils'
import { inputNumberLight } from '../../input/styles/input-light'
export default defineComponent({
  name: 'ClInputNumber',
  props: inputNumberProps,
  emits: inputNumberEmits,
  components: {
    ClIcon
  },
  setup(props, { emit }) {
    const themeRef = useTheme('inputNumber', inputNumberLight)
    const inputRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()
    const { modelValue } = toRefs(props)
    const data = reactive({
      currentValue: modelValue,
      focused: false,
      hovering: false
    })
    // 监听订单状态变化,订单状态更新时更新快速选择
    watch(
      () => props.modelValue,
      (newVal) => {
        data.currentValue = newVal
      },
      { immediate: true }
    )
    const inputNumberDisabled = computed(() => {
      return props.disabled
    })
    // 减不可点
    const minDisabled = computed(() => {
      return toDecrease(data.currentValue, props.step) < props.min || inputNumberDisabled.value
    })
    // 加不可点
    const maxDisabled = computed(() => {
      return toIncrease(data.currentValue, props.step) > props.max || inputNumberDisabled.value
    })

    const hasControls = computed(() => {
      return (
        props.layout === 'between' || (props.layout === 'right' && (data.focused || data.hovering))
      )
    })
    const showClear = computed(() => {
      /**
       * 用户定义clearable显示
       * 只读 和 置灰不显示
       * 有值才显示
       * 悬浮和激活显示
       */
      return (
        props.clearable &&
        !inputNumberDisabled.value &&
        !props.readonly &&
        props.modelValue &&
        (data.focused || data.hovering)
      )
    })
    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme
      const {
        inputColor,
        borderHoverColor,
        placeholderColor,
        backgroundColorDisabled,
        backgroundColor,
        borderColorDisabled,
        borderColorError,
        clearColor,
        clearHoverColor,
        controlsColor
      } = self
      let colorProps = {
        '--cl-input-color': inputColor,
        '--cl-input-border-hover-color': borderHoverColor,
        '--cl-input-caret-color': borderHoverColor,
        '--cl-input-placeholder-color': placeholderColor,
        '--cl-input-background-color': backgroundColor,
        '--cl-input-disabled-background-color': backgroundColorDisabled,
        '--cl-input-disabled-border-color': borderColorDisabled,
        '--cl-input-readonly-border-color': borderColorDisabled,
        '--cl-input-controls-color': controlsColor,
        '--cl-input-error-border-color': borderColorError,
        '--cl-input-clear-color': clearColor,
        '--cl-input-hover-color': clearHoverColor
      }
      const {
        inputHeight,
        inputRadius,
        inputBorder,
        inputFontWeight,
        inputFontSize,
        inputPadding,
        clearPaddingRight
      } = self
      let sizeProps = {
        '--cl-input-width': props.inputWidth + 'px',
        '--cl-input-height': inputHeight,
        '--cl-input-border-radius': inputRadius,
        '--cl-input-border': inputBorder,
        '--cl-input-font-weight': inputFontWeight,
        '--cl-input-font-size': inputFontSize,
        '--cl-input-padding-horizontal': inputPadding,
        '--cl-input-clear-padding-right': clearPaddingRight
      }
      const { countFontSize, countColor, innerPadding, controlsPadding, controlsWidth } = self
      let countProps = {
        '--cl-input-count-font-size': countFontSize,
        '--cl-input-count-color': countColor,
        '--cl-input-padding-horizontal': inputPadding,
        '--cl-input-controls-border': inputBorder,
        '--cl-input-inner-padding': innerPadding,
        '--cl-input-controls-padding': controlsPadding,
        '--cl-input-controls-width': controlsWidth
      }
      return {
        ...colorProps,
        ...sizeProps,
        ...countProps
      }
    })
    /**
     * 获取小数位数
     * 如果空值，精度为0，
     */
    const getPrecision = (value: number): number => {
      if (!value) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    }

    // 加计算，将val转为整数进行计算，解决精度计算问题
    const toIncrease = (val = 0, step: number): number => {
      const precisionFactor = Math.pow(10, getPrecision(val))
      const precisionFactorVal = (precisionFactor * val).toString()
      return (parseInt(precisionFactorVal, 10) + precisionFactor * step) / precisionFactor
    }

    // 减计算，将val转为整数进行计算，解决精度计算问题
    const toDecrease = (val = 0, step: number): number => {
      const precisionFactor = Math.pow(10, getPrecision(val))
      const precisionFactorVal = (precisionFactor * val).toString()
      return (parseInt(precisionFactorVal, 10) - precisionFactor * step) / precisionFactor
    }
    // 点击减
    const handleDecrease = () => {
      if (minDisabled.value || props.readonly) return
      const newVal = toDecrease(data.currentValue, props.step)
      setCurrentValue(newVal)
    }
    // 点击加
    const handleIncrease = () => {
      if (maxDisabled.value || props.readonly) return
      const newVal = toIncrease(data.currentValue, props.step)
      setCurrentValue(newVal)
    }
    const setCurrentValue = (newVal: string | number) => {
      // 为空串不做任何处理
      if (newVal !== '') {
        let newValue = Number(newVal)
        if (newValue > props.max) newValue = props.max
        if (newValue < props.min) newValue = props.min
        if (props.precision !== undefined) {
          newValue = Number(newValue.toFixed(props.precision))
        }
        newVal = newValue
      }
      emit('update:modelValue', Number(newVal))
      emit('input', Number(newVal))
      emit('change', Number(newVal))
      data.currentValue = Number(newVal)
    }
    const handleInput = (event: Event) => {
      // todo why和input不一样？
      const target = event.target as HTMLInputElement
      const value = target.value
      const newVal = value !== '' ? Number(value) : ''
      if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
        setCurrentValue(newVal)
      }
    }
    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const value = target.value
      setCurrentValue(value)
    }
    const handleFocus = (event: FocusEvent) => {
      data.focused = true
      emit('focus', event)
    }
    const handleBlur = (event: FocusEvent) => {
      data.focused = false
      emit('blur', event)
    }
    const clearClick = () => {
      setCurrentValue('')
      emit('clear')
    }
    const focus = () => {
      inputRef?.value?.focus()
    }
    const blur = () => {
      inputRef?.value?.blur()
    }
    return {
      data,
      inputRef,
      cssVars: cssVarsRef,
      showClear,
      inputNumberDisabled,
      hasControls,
      minDisabled,
      maxDisabled,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      clearClick,
      focus,
      blur,
      handleDecrease,
      handleIncrease
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/input-number.scss';
</style>
