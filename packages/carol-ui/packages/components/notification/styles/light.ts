import type { Theme } from '@/hooks/use-theme'
import { commonLight, type ThemeCommonVars } from '@/styles'
export const self = (vars: ThemeCommonVars) => {
  const {
    textColorBase,
    errorColor,
    warningColor,
    successColor,
    infoColor,
    baseColor,
    textColor1,
    textColor2,
    textColor3,
    textColor4
  } = vars
  // 抽取常量
  const notificationVariables = {
    notificationWidth: '320px',
    notificationPadding: '14px 16px 16px',
    notificationBorderRadius: '4px',
    notificationBorderColor: '#ebeef5',
    boxShadow: '0 2px 6px 1px #d4d7dc',
    offsetPostion: '16px',
    titleSize: '16px',
    contentSize: '14px',
    contentPadding: '4px 18px 0 0',
    closeColor: textColor4,
    closeHoverColor: textColor3
  }
  return {
    ...notificationVariables,
    color: textColorBase,
    colorError: errorColor,
    colorWarning: warningColor,
    colorInfo: infoColor,
    colorSuccess: successColor,
    backgroundColor: baseColor,
    titleColor: textColor1,
    contentColor: textColor2
  }
}

export type NotificationThemeVars = ReturnType<typeof self>

export const notificationLight: Theme<'notification', NotificationThemeVars> = {
  name: 'notification',
  common: commonLight,
  self
}

export type NotificationTheme = typeof notificationLight
