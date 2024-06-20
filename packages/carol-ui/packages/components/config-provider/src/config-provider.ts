import type { ExtractThemeOverrides } from '@/hooks/use-theme'
import type { ThemeCommonVars } from '@/styles'
import type { ExtractPropTypes, PropType, Ref } from 'vue'
import type { CustomTheme } from './custom-theme'

export interface ConfigProviderInjection {
  mergedThemeRef: Ref<GlobalTheme | undefined>
  mergedThemeOverridesRef: Ref<GlobalThemeOverrides | undefined>
  mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined>
}

export interface GlobalThemeWithoutCommon extends CustomTheme {}

export interface GlobalTheme extends GlobalThemeWithoutCommon {
  name: string
  common?: ThemeCommonVars
}

export type GlobalThemeOverrides = {
  common?: Partial<ThemeCommonVars>
} & {
  [key in keyof GlobalThemeWithoutCommon]?: ExtractThemeOverrides<GlobalThemeWithoutCommon[key]>
}

export interface GlobalComponentConfig {
  // Pagination?: {
  //   inputSize?: InputSize
  //   selectSize?: SelectSize
  // }
  // DatePicker?: {
  //   timePickerSize?: TimePickerSize
  // }
  // Dialog?: {
  //   iconPlacement?: IconPlacement
  // }
  // DataTable?: {
  //   renderFilter?: DataTableRenderFilter
  //   renderSorter?: DataTableRenderSorter
  // }
  // DynamicInput?: {
  //   buttonSize?: ButtonSize
  // }
  // Empty?: Pick<EmptyProps, 'description' | 'renderIcon'>
}

// export type GlobalComponentConfig;

export const configProviderProps = {
  theme: Object as PropType<GlobalTheme | null>,
  themeOverrides: Object as PropType<GlobalThemeOverrides | null>,
  componentOptions: Object as PropType<GlobalComponentConfig>
  // icons: Object as PropType<GlobalIconConfig>,
  // breakpoints: Object as PropType<Breakpoints>,
  // preflightStyleDisabled: Boolean,
  // inlineThemeDisabled: {
  //   type: Boolean,
  //   default: undefined
  // },
} as const

export type ConfigProviderProps = Partial<ExtractPropTypes<typeof configProviderProps>>
