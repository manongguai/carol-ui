<template>
  <slot></slot>
</template>

<script lang="ts">
import { computed, defineComponent, inject, provide } from 'vue'
import { configProviderProps } from './config-provider'
import configProviderInjectionKey from './context'
export default defineComponent({
  name: 'ClConfigProvider',
  props: configProviderProps,
  setup(props) {
    const clConfigProvider = inject(configProviderInjectionKey, null)
    const mergedThemeRef = computed(() => {
      const { theme } = props
      if (theme === null) return undefined
      const inheritedTheme = clConfigProvider?.mergedThemeRef.value
      return theme === undefined
        ? inheritedTheme
        : inheritedTheme === undefined
        ? theme
        : Object.assign({}, inheritedTheme, theme)
    })

    const mergedThemeOverridesRef = computed(() => {
      const { themeOverrides } = props
      // stop inheriting themeOverrides
      if (themeOverrides === null) return undefined
      // use inherited themeOverrides
      if (themeOverrides === undefined) {
        return clConfigProvider?.mergedThemeOverridesRef.value
      } else {
        const inheritedThemeOverrides = clConfigProvider?.mergedThemeOverridesRef.value
        if (inheritedThemeOverrides === undefined) {
          // no inherited, use self overrides
          return themeOverrides
        } else {
          // merge overrides
          return Object.assign({}, inheritedThemeOverrides, themeOverrides)
        }
      }
    })

    const mergedComponentPropsRef = computed(() => {
      const { componentOptions } = props
      if (componentOptions !== undefined) return componentOptions
      return clConfigProvider?.mergedComponentPropsRef.value
    })

    provide(configProviderInjectionKey, {
      mergedThemeRef,
      mergedThemeOverridesRef,
      mergedComponentPropsRef
    })
    return {
      mergedThemeRef,
      mergedThemeOverridesRef,
      mergedComponentPropsRef
    }
  }
})
</script>
