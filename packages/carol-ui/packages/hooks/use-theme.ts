import type { GlobalTheme } from '@/components/config-provider/src/config-provider'
import configProviderInjectionKey from '@/components/config-provider/src/context'
import type { ThemeCommonVars } from '@/styles'
import { inject, type ComputedRef, computed } from 'vue'

export interface Theme<N, T = {}> {
  name: N
  common?: ThemeCommonVars
  self?: (vars: ThemeCommonVars) => T
}

export type ExtractThemeVars<T> = T extends Theme<unknown, infer U>
  ? unknown extends U // self is undefined, ThemeVars is unknown
    ? {}
    : U
  : {}

export type ExtractThemeOverrides<T> = Partial<ExtractThemeVars<T>> & { common?: ThemeCommonVars }

export type MergedTheme<T> = T extends Theme<unknown, infer V>
  ? {
      common: ThemeCommonVars
      self: V
    }
  : T

function useTheme<N, T>(
  resolveId: Exclude<keyof GlobalTheme, 'common' | 'name'>,
  defaultTheme: Theme<N, T>
): ComputedRef<MergedTheme<Theme<N, T>>> {
  const clConfigProvider = inject(configProviderInjectionKey, null)
  const mergedThemeRef = computed(() => {
    const {
      common: globalCommon = undefined,
      [resolveId]: { common: globalSelfCommon = undefined, self: globalSelf = undefined } = {}
    } = clConfigProvider?.mergedThemeRef.value || {}

    const { common: globalCommonOverrides = undefined, [resolveId]: globalSelfOverrides = {} } =
      clConfigProvider?.mergedThemeOverridesRef.value || {}

    const { common: globalSelfCommonOverrides } = globalSelfOverrides

    const mergedCommon = Object.assign(
      {},
      globalSelfCommon || globalCommon || defaultTheme.common,
      globalCommonOverrides,
      globalSelfCommonOverrides
    )

    const mergedSelf = Object.assign(
      {},
      (globalSelf || defaultTheme.self)?.(mergedCommon) as T,
      globalSelfOverrides
    )
    return {
      common: mergedCommon,
      self: mergedSelf
    }
  })
  return mergedThemeRef
}

export default useTheme
