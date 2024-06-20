import type { Theme } from '@/hooks/use-theme'
import commonLight from '@/styles/light'
import type { ThemeCommonVars } from '@/styles'

const commonVariables = {
  paddingSmall: '2px 6px',
  paddingMedium: '6px 6px',
  paddingLarge: '10px 6px',
  minWidthSmall: '56px',
  minWidthMedium: '80px',
  minWidthLarge: '88px',
  // paddingRoundSmall: '0 14px',
  // paddingRoundMedium: '0 18px',
  // paddingRoundLarge: '0 22px',
  iconMarginSmall: '6px',
  iconMarginMedium: '6px',
  iconMarginLarge: '6px',
  iconSizeSmall: '18px',
  iconSizeMedium: '18px',
  iconSizeLarge: '20px'
}

export const self = (vars: ThemeCommonVars) => {
  const {
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadius,
    borderRadiusSmall,
    borderRadiusMedium,
    borderRadiusLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    textColor3,
    borderColor,
    primaryColor,
    primaryColorHover,
    secondaryColor,
    secondaryColorHover,
    minorColor,
    baseColor,
    textColorInvert,
    textColorDisabled,
    bgColor2,
    warningColor,
    warningColorHover,
    warningColor2,
    warningColorHover2,
    infoColor,
    infoColorHover,
    fontWeight,
    fontWeightStrong
  } = vars
  return {
    ...commonVariables,
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadius,
    borderRadiusSmall: borderRadiusSmall,
    borderRadiusMedium: borderRadiusMedium,
    borderRadiusLarge: borderRadiusLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,

    // primary
    colorPrimary: primaryColor,
    colorHoverPrimary: primaryColorHover,
    colorDisabledPrimary: textColorDisabled,
    colorWarningPrimary: warningColor,
    colorHoverWarningPrimary: warningColorHover,
    textColorPrimary: textColorInvert,
    textColorHoverPrimary: textColorInvert,
    textColorDisabledPrimary: textColorInvert,
    borderPrimary: `1px solid ${primaryColor}`,
    borderHoverPrimary: `1px solid ${primaryColorHover}`,
    borderDisabledPrimary: `1px solid ${textColorDisabled}`,
    borderWarningPrimary: `1px solid ${warningColor}`,
    borderHoverWarningPrimary: `1px solid ${warningColorHover}`,

    // secondary
    colorSecondary: secondaryColor,
    colorHoverSecondary: secondaryColor,
    colorDisabledSecondary: bgColor2,
    colorWarningSecondary: warningColor2,
    colorHoverWarningSecondary: warningColorHover2,
    textColorSecondary: minorColor,
    textColorHoverSecondary: primaryColorHover,
    textColorDisabledSecondary: textColorDisabled,
    textColorWarningSecondary: warningColor,
    textColorHoverWarningSecondary: warningColorHover,
    borderSecondary: `1px solid ${primaryColor}`,
    borderHoverSecondary: `1px solid ${primaryColorHover}`,
    borderDisabledSecondary: `1px solid ${bgColor2}`,
    borderWarningSecondary: `1px solid ${warningColor2}`,
    borderHoverWarningSecondary: `1px solid ${warningColorHover2}`,

    // Minor
    colorMinor: baseColor,
    colorHoverMinor: secondaryColor,
    colorDisabledMinor: bgColor2,
    colorWarningMinor: baseColor,
    colorHoverWarningMinor: baseColor,
    textColorMinor: minorColor,
    textColorHoverMinor: primaryColorHover,
    textColorDisabledMinor: textColorDisabled,
    textColorWarningMinor: warningColor,
    textColorHoverWarningMinor: warningColorHover,
    borderMinor: `1px solid ${primaryColor}`,
    borderHoverMinor: `1px solid ${primaryColorHover}`,
    borderDisabledMinor: `1px solid ${bgColor2}`,
    borderWarningMinor: `1px solid ${warningColor}`,
    borderHoverWarningMinor: `1px solid ${warningColorHover}`,

    // default type
    color: '#0000',
    colorHover: '#0000',
    colorDisabled: '#0000',
    textColor: textColor3,
    textColorHover: primaryColorHover,
    textColorDisabled: textColorDisabled,
    border: `1px solid ${borderColor}`,
    borderHover: `1px solid ${primaryColorHover}`,
    borderDisabled: `1px solid ${borderColor}`,

    // dashed type
    colorDashed: baseColor,
    colorHoverDashed: secondaryColorHover,
    colorDisabledDashed: baseColor,
    textColorDashed: minorColor,
    textColorHoverDashed: primaryColorHover,
    textColorDisabledDashed: textColorDisabled,
    borderDashed: `1px dashed ${primaryColor}`,
    borderHoverDashed: `1px dashed ${primaryColorHover}`,
    borderDisabledDashed: `1px dashed ${borderColor}`,

    //Link /Text
    colorLink: '#0000',
    colorHoverLink: '#0000',
    colorDisabledLink: '#0000',
    textColorLink: minorColor,
    textColorHoverLink: primaryColorHover,
    textColorDisabledLink: textColorDisabled,
    textColorWarningLink: warningColor,
    textColorHoverWarningLink: warningColorHover,
    textColorInfoLink: infoColor,
    textColorHoverInfoLink: infoColorHover,
    colorText: '#0000',
    colorHoverText: '#0000',
    colorDisabledText: '#0000',
    textColorText: minorColor,
    textColorHoverText: primaryColorHover,
    textColorDisabledText: textColorDisabled,
    textColorWarningText: warningColor,
    textColorHoverWarningText: warningColorHover,
    textColorInfoText: infoColor,
    textColorHoverInfoText: infoColorHover,

    //Underlined
    colorUnderlined: '#0000',
    colorHoverUnderlined: '#0000',
    colorDisabledUnderlined: '#0000',
    textColorUnderlined: minorColor,
    textColorHoverUnderlined: primaryColorHover,
    textColorDisabledUnderlined: textColorDisabled,
    textColorWarningUnderlined: warningColor,
    textColorHoverWarningUnderlined: warningColorHover,
    textColorInfoUnderlined: infoColor,
    textColorHoverInfoUnderlined: infoColorHover,

    // font
    waveOpacity: '0.6',
    fontWeight,
    fontWeightStrong
  }
}

export type ButtonThemeVars = ReturnType<typeof self>

export const buttonLight: Theme<'button', ButtonThemeVars> = {
  name: 'button',
  common: commonLight,
  self
}

export type ButtonTheme = typeof buttonLight
