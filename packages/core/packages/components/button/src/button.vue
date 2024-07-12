<template>
  <button
    ref="buttonRef"
    :class="[
      `cl-button`,
      `cl-button--${type}-type`,
      `cl-button--${mergedSize}-type`,
      buttonDisabled && `is-disabled`,
      block && `is-block`,
      color && `cl-button--color`,
      loading && `is-loading`
    ]"
    :type="nativeType"
    :style="(cssVars as CSSProperties)"
    @click="handleClick"
  >
    <cl-icon
      iconName="cl-icon-loading"
      class="is-loading"
      :color="cssVars['--cl-text-color']?.toString()"
      v-if="loading"
    ></cl-icon>
    <cl-icon :iconName="icon" :color="iconColor" v-else-if="icon"></cl-icon>
    <span>
      <slot></slot>
    </span>
    <div v-show="!buttonDisabled" class="cl-button_border"></div>
    <div v-show="!buttonDisabled" class="cl-button_state-border"></div>
  </button>
</template>
<script lang="ts">
import { computed, inject, defineComponent, ref, type CSSProperties, type Ref } from 'vue'
import { buttonProps, buttonEmits } from './button'
import { buttonGroupInjectionKey } from '../../button-group/src/context'
import { buttonLight } from '../styles/light'
import useTheme from '@/hooks/use-theme'
import { createHoverColor, createKey } from '@kirkw/utils'
import ClIcon from '@/components/icon'
import { useFormDisabled, useFormSize } from '@/hooks/use-form-props'

export default defineComponent({
  name: 'ClButton',
  props: buttonProps,
  emits: buttonEmits,
  components: {
    ClIcon
  },
  setup(props, { emit }) {
    const clButtonGroup = inject(buttonGroupInjectionKey, {})
    const buttonRef: Ref<HTMLElement | null> = ref<HTMLElement | null>(null)
    const formSize = useFormSize()
    const mergedSizeRef = computed(() => {
      const { size } = props
      if (size) return size
      const { size: buttonGroupSize } = clButtonGroup
      if (buttonGroupSize) return buttonGroupSize
      return formSize.value || 'medium'
    })
    const buttonDisabled = useFormDisabled()
    const handleClick = (e: MouseEvent): void => {
      if (!buttonDisabled.value && !props.loading) {
        emit('click', e)
      }
    }

    const themeRef = useTheme('button', buttonLight)

    const cssVarsRef = computed<CSSProperties>(() => {
      const theme = themeRef.value
      const { self } = theme
      const { fontWeightStrong } = self
      const size = mergedSizeRef.value
      const { type, color, round, textColor, scene } = props

      // font
      const fontProps: CSSProperties = {
        '--cl-font-weight': fontWeightStrong
      }
      // color
      const mergedColor = color || self[createKey('color', type)]
      const mergedTextColor = textColor || self[createKey('textColor', type)]
      let colorProps: CSSProperties = {
        '--cl-color': mergedColor,
        '--cl-color-disabled': self[createKey('colorDisabled', type)],
        '--cl-color-hover': color ? createHoverColor(color) : self[createKey('colorHover', type)],
        '--cl-text-color': mergedTextColor,
        '--cl-text-color-disabled': self[createKey('textColorDisabled', type)],
        '--cl-text-color-hover': textColor
          ? createHoverColor(mergedTextColor)
          : self[createKey('textColorHover', type)]
      }

      // border
      let borderProps: CSSProperties = {
        '--cl-border': 'initial',
        '--cl-border-hover': 'initial',
        '--cl-border-disabled': 'initial'
      }
      if (type != 'link' && type != 'text' && type != 'underlined') {
        borderProps = {
          '--cl-border': self[createKey('border', type)],
          '--cl-border-hover': self[createKey('borderHover', type)],
          '--cl-border-disabled': self[createKey('borderDisabled', type)]
        }
      }

      // adjust color based on scene if there is no color props...
      if (!color) {
        if (scene == 'warning') {
          if (type == 'primary' || type == 'secondary' || type == 'minor') {
            colorProps['--cl-color'] = self[createKey(createKey('color', scene), type)]
            colorProps['--cl-color-hover'] = self[createKey(createKey('colorHover', scene), type)]
          }
        }
      }

      // adjust text color based on scene if there is no textColor Props.
      if (!textColor) {
        if (scene && scene != 'normal') {
          if (type == 'link' || type == 'text' || type == 'underlined') {
            colorProps['--cl-text-color'] = self[createKey(createKey('textColor', scene), type)]
            colorProps['--cl-text-color-hover'] =
              self[createKey(createKey('textColorHover', scene), type)]
          }
        }
        if (scene == 'warning') {
          if (type == 'secondary' || type == 'minor') {
            colorProps['--cl-text-color'] = self[createKey(createKey('textColor', scene), type)]
            colorProps['--cl-text-color-hover'] =
              self[createKey(createKey('textColorHover', scene), type)]
          }
        }
      }

      // adjust border color based on scene.
      if (scene == 'warning') {
        if (type == 'primary' || type == 'secondary' || type == 'minor') {
          borderProps['--cl-border'] = self[createKey(createKey('border', scene), type)]
          borderProps['--cl-border-hover'] = self[createKey(createKey('borderHover', scene), type)]
        }
      }

      // size
      const {
        [createKey('height', size)]: height,
        [createKey('fontSize', size)]: fontSize,
        [createKey('padding', size)]: padding,
        [createKey('minWidth', size)]: minWidth,
        [createKey('borderRadius', size)]: borderRadius
      } = self

      const textBtn = type == 'text' || type == 'link' || type == 'underlined'
      const sizeProps: CSSProperties = {
        '--cl-width': 'initial',
        '--cl-height': textBtn ? 'initial' : height,
        '--cl-font-size': fontSize,
        '--cl-min-width': minWidth,
        '--cl-padding': textBtn ? 'initial' : padding,
        '--cl-border-radius': textBtn ? 'initial' : round ? borderRadius : self['borderRadius']
      }
      return {
        ...fontProps,
        ...colorProps,
        ...borderProps,
        ...sizeProps
      }
    })
    return {
      mergedSize: mergedSizeRef,
      handleClick,
      buttonRef,
      cssVars: cssVarsRef,
      buttonDisabled
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/button.scss';
</style>
