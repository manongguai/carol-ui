<template>
  <span
    :class="['cl-input', inputDisabled && 'is-disabled', readonly && 'is-readonly']"
    @mouseenter="data.hovering = true"
    @mouseleave="data.hovering = false"
    :style="(cssVars as CSSProperties)"
  >
    <!-- 前置内容 -->
    <span class="cl-input-prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </span>

    <input
      ref="inputRef"
      class="cl-input-inner"
      v-bind="$attrs"
      :type="reloadType"
      v-model="data.valueData"
      :maxlength="reloadMaxlength"
      :readonly="readonly"
      :disabled="inputDisabled"
      :placeholder="placeholderText"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    />
    <span class="cl-input-suffix">
      <!-- 清空图标 -->
      <cl-icon
        v-show="showClear"
        iconName="cl-icon-circle-close"
        :color="cssVars['--cl-input-clear-color']?.toString()"
        @mousedown.prevent
        @click.stop="clearClick"
      ></cl-icon>
      <!-- 睁眼闭眼 -->
      <cl-icon
        v-show="showPwdVisible"
        :iconName="`cl-icon-${data.passwordVisible ? 'mingwen' : 'hide'}`"
        @click="handlePasswordVisible"
      ></cl-icon>
      <!-- 字数计算 -->
      <span v-if="isWordLimitVisible" class="cl-input-count">
        {{ currentLength }}/{{ maxlength }}
      </span>
      <span class="cl-input-suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </span>
    </span>
  </span>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, type CSSProperties, computed, type Ref } from 'vue'
import { inputProps, inputEmits } from './input'
import { inputLight } from '../styles/input-light'
import useTheme from '@/hooks/use-theme'
import ClIcon from '@/components/icon'
// import { createHoverColor, createKey } from '@/utils'
export default defineComponent({
  name: 'ClInput',
  props: inputProps,
  emits: inputEmits,
  components: {
    ClIcon
  },
  setup(props, { emit }) {
    const themeRef = useTheme('input', inputLight)
    const inputRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()
    const data = reactive({
      valueData: '' as String | Number,
      focused: false,
      hovering: false,
      isComposing: false, // 中文输入法时
      passwordVisible: false
    })
    // 监听订单状态变化,订单状态更新时更新快速选择
    watch(
      () => props.modelValue,
      (newVal) => {
        data.valueData = newVal
      },
      { immediate: true }
    )
    const inputDisabled = computed(() => {
      return props.disabled
    })
    const isWordLimitVisible = computed(() => {
      /**
       * 用户定义showWordLimit，且 用户限制输入长度
       * 输入框在 disabled 和 readonly 状态不显示计数
       */
      return props.showWordLimit && props.maxlength && !inputDisabled.value && !props.readonly
    })
    const currentLength = computed(() => {
      if (typeof props.modelValue === 'number') {
        return String(props.modelValue).length
      }
      return (props.modelValue as string).length
    })
    const focus = () => {
      inputRef?.value?.focus()
    }
    const blur = () => {
      inputRef?.value?.blur()
    }
    const showPwdVisible = computed(() => {
      return (
        props.type === 'password' &&
        props.visibilityToggle &&
        !inputDisabled.value &&
        !props.readonly
      )
    })
    const reloadMaxlength = computed(() => {
      return props.type === 'phone' ? 11 : props.type
    })
    const reloadType = computed(() => {
      return props.type === 'password' && data.passwordVisible ? 'text' : props.type
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
        !inputDisabled.value &&
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
        borderColorDisabled,
        borderColorError,
        clearColor,
        clearHoverColor,
        backgroundColor
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

      const { countFontSize, countColor } = self
      let countProps = {
        '--cl-input-count-font-size': countFontSize,
        '--cl-input-count-color': countColor,
        '--cl-input-padding-horizontal': inputPadding
      }
      return {
        ...colorProps,
        ...sizeProps,
        ...countProps
      }
    })
    const handleInput = (event: Event) => {
      let inputElement = event.target as HTMLInputElement
      let { value } = inputElement
      if (data.isComposing) return // 中文拼音输入时不触发双向绑定
      if (value === props.modelValue) return
      if (props.type === 'phone') {
        value = value.replace(/[^0-9]/g, '')
        inputElement.value = value
      }
      emit('update:modelValue', value)
      emit('input', value) // 语法糖，用于更新v-model
    }
    const handleChange = (event: Event) => {
      let { value } = event.target as HTMLInputElement
      emit('change', value)
    }
    const handleFocus = (event: FocusEvent) => {
      data.focused = true
      emit('focus', event)
    }
    const handleBlur = (event: FocusEvent) => {
      if (!data.hovering) {
        data.focused = false
        emit('blur', event)
      }
    }
    const handleCompositionStart = () => {
      data.isComposing = true
    }
    const handleCompositionEnd = (event: CompositionEvent) => {
      if (data.isComposing) {
        data.isComposing = false
        handleInput(event)
      }
    }
    const handleKeydown = (event: KeyboardEvent) => {
      emit('keydown', event)
    }
    const handlePasswordVisible = () => {
      data.passwordVisible = !data.passwordVisible
    }
    const clearClick = () => {
      data.valueData = ''
      emit('update:modelValue', data.valueData.toString())
      emit('clear')
      // emit('input', '')
      emit('change', data.valueData.toString())
    }
    return {
      data,
      inputRef,
      cssVars: cssVarsRef,
      showClear,
      inputDisabled,
      currentLength,
      isWordLimitVisible,
      reloadMaxlength,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleKeydown,
      handleCompositionStart,
      handleCompositionEnd,
      clearClick,
      handlePasswordVisible,
      showPwdVisible,
      reloadType,
      focus,
      blur
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/input.scss';
</style>
