<template>
  <div
    :class="['cl-textarea', textareaDisabled && 'is-disabled', readonly && 'is-readonly']"
    :style="( data.boxStyle as CSSProperties)"
    ref="boxRef"
  >
    <!-- wrap的包裹是为slot预留区域 -->
    <div class="cl-textarea-inner-wrap">
      <textarea
        ref="textareaRef"
        class="cl-textarea-inner"
        v-bind="$attrs"
        v-model="data.valueData"
        :rows="newRows"
        :placeholder="placeholderText"
        :readonly="readonly"
        :disabled="textareaDisabled"
        :maxlength="maxlength"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
      ></textarea>

      <span class="cl-textarea-bottom-right">
        <!-- 清空 -->
        <cl-icon
          v-show="showClear"
          iconName="cl-icon-circle-close"
          :color="cssVars['--cl-input-clear-color']?.toString()"
          @mousedown.prevent
          @click="clearClick"
        ></cl-icon>
        <!-- 计数器 -->
        <span v-if="isWordLimitVisible" class="cl-input-count">
          {{ currentLength }} / {{ maxlength }}
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  type Ref,
  type CSSProperties,
  computed,
  onMounted,
  reactive,
  nextTick,
  defineComponent,
  ref,
  watch
} from 'vue'
import { textareaEmits, textareaProps } from './textarea'
import useTheme from '@/hooks/use-theme'
import { textareaLight } from '../../input/styles/input-light'
import ClIcon from '@/components/icon'
import { calcTextareaHeight, calcBoxHeight } from './calcTextareaHeight'

export default defineComponent({
  name: 'ClTextarea',
  props: textareaProps,
  emits: textareaEmits,
  components: {
    ClIcon
  },
  setup(props, { emit }) {
    const textareaRef: Ref<HTMLTextAreaElement | undefined> = ref<HTMLTextAreaElement | undefined>()
    const themeRef = useTheme('textarea', textareaLight)
    const boxRef: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>()
    const data = reactive({
      valueData: '',
      isComposing: false,
      focused: false,
      boxStyle: {}
    })
    const textareaDisabled = computed(() => {
      return props.disabled
    })
    const isWordLimitVisible = computed(() => {
      return props.showWordLimit && props.maxlength && !textareaDisabled.value && !props.readonly
    })

    const currentLength = computed(() => {
      return (props.modelValue || '').length
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
        !textareaDisabled.value &&
        !props.readonly &&
        props.modelValue &&
        data.focused
      )
    })

    const newRows = computed(() => {
      return Math.max(props.minRows, Math.min(props.rows, props.maxRows))
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
        clearHoverColor
      } = self
      let colorProps = {
        '--cl-input-color': inputColor,
        '--cl-input-border-hover-color': borderHoverColor,
        '--cl-input-background-color': backgroundColor,
        '--cl-input-caret-color': borderHoverColor,
        '--cl-input-placeholder-color': placeholderColor,
        '--cl-input-disabled-background-color': backgroundColorDisabled,
        '--cl-input-disabled-border-color': borderColorDisabled,
        '--cl-input-readonly-border-color': borderColorDisabled,
        '--cl-input-error-border-color': borderColorError,
        '--cl-input-clear-color': clearColor,
        '--cl-input-hover-color': clearHoverColor
      }
      const {
        inputRadius,
        inputBorderColor,
        inputFontWeight,
        inputFontSize,
        inputPadding,
        clearPaddingRight
      } = self
      let sizeProps = {
        '--cl-input-width': props.inputWidth + 'px',
        '--cl-input-border-radius': inputRadius,
        '--cl-input-border-color': inputBorderColor,
        '--cl-input-font-weight': inputFontWeight,
        '--cl-input-font-size': inputFontSize,
        '--cl-input-padding-horizontal': inputPadding,
        '--cl-input-clear-padding-right': clearPaddingRight
      }
      const { countFontSize, countColor } = self
      let countProps = {
        '--cl-input-count-font-size': countFontSize,
        '--cl-input-clear-font-size': countFontSize,
        '--cl-input-count-color': countColor,
        '--cl-input-clear-hover-color': clearHoverColor,
        '--cl-input-padding-horizontal': inputPadding
      }
      return {
        ...colorProps,
        ...sizeProps,
        ...countProps
      }
    })

    const resizeTextarea = () => {
      /* 设置min-height，主要是防止textarea原生的rows属性不被覆盖*/
      if (textareaRef.value) {
        textareaRef.value.style.minHeight = calcTextareaHeight(textareaRef.value) ?? ''
      }
    }
    watch(
      () => props.modelValue,
      (val: string) => {
        data.valueData = val
        /* value变化更改textarea高度*/
        nextTick(resizeTextarea)
      },
      {
        immediate: true
      }
    )

    const initBoxStyle = () => {
      if (boxRef.value && textareaRef.value) {
        const boxStyle = calcBoxHeight(
          boxRef.value,
          textareaRef.value,
          newRows.value,
          props.minRows,
          props.maxRows,
          props.autoSize
        )
        data.boxStyle = {
          ...cssVarsRef.value,
          '--cl-box-height': boxStyle.height,
          '--cl-box-min-height': boxStyle.minHeight,
          '--cl-box-max-height': boxStyle.maxHeight
        }
      }
    }
    onMounted(async () => {
      await nextTick()
      initBoxStyle()
    })
    const handleInput = (event: Event) => {
      let { value } = event.target as HTMLInputElement
      if (data.isComposing) {
        nextTick(resizeTextarea)
        return /* 中文拼音输入时不触发双向绑定*/
      }
      if (value === props.modelValue) return
      emit('update:modelValue', value)
      emit('input', value)
    }
    /** 聚焦 **/
    const handleFocus = (event: FocusEvent) => {
      data.focused = true
      emit('focus', event)
    }
    /** 失焦 **/
    const handleBlur = (event: FocusEvent) => {
      data.focused = false
      emit('blur', event)
    }

    const handleChange = (event: Event) => {
      let { value } = event.target as HTMLInputElement
      emit('change', value)
    }
    const handleCompositionStart = () => {
      data.isComposing = true
    }

    const handleCompositionEnd = (event: Event) => {
      if (data.isComposing) {
        data.isComposing = false
        handleInput(event)
      }
    }

    const clearClick = () => {
      data.valueData = ''
      emit('update:modelValue', data.valueData.toString())
      emit('clear')
      emit('input', '')
      emit('change', '')
    }

    function focus() {
      textareaRef?.value?.focus()
    }

    function blur() {
      textareaRef?.value?.blur()
    }

    return {
      data,
      cssVars: cssVarsRef,
      textareaRef,
      boxRef,
      showClear,
      textareaDisabled,
      isWordLimitVisible,
      currentLength,
      newRows,
      handleInput,
      handleChange,
      handleCompositionStart,
      handleCompositionEnd,
      clearClick,
      handleFocus,
      handleBlur,
      focus,
      blur
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/textarea.scss';
</style>
