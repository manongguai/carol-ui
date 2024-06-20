import type { ButtonTheme } from '@/components/button/styles'
import type { DrawerTheme } from '@/components/drawer/styles'
import type { ColorPickerTheme } from '@/components/color-picker/styles'
import type { IconTheme } from '@/components/icon/styles'
import type { InputTheme } from '@/components/input/styles'
import type { InputGroupTheme } from '@/components/input-group/styles'
import type { InputNumberTheme } from '@/components/input-number/styles'
import type { PanelTheme } from '@/components/panel/styles'
import type { PopConfirmTheme } from '@/components/pop-confirm/styles'
import type { PopupTheme } from '@/components/popup/styles'
import type { StepTheme } from '@/components/step/styles'
import type { StepsTheme } from '@/components/steps/styles'
import type { TextareaTheme } from '@/components/textarea/styles'
import type { TitleTheme } from '@/components/title/styles'
import type { NotificationTheme } from '@/components/notification/styles'

export interface CustomTheme {
  button?: ButtonTheme
  drawer?: DrawerTheme
  colorPicker?: ColorPickerTheme
  icon?: IconTheme
  input?: InputTheme
  inputGroup?: InputGroupTheme
  inputNumber?: InputNumberTheme
  panel?: PanelTheme
  popConfirm?: PopConfirmTheme
  popup?: PopupTheme
  step?: StepTheme
  steps?: StepsTheme
  textarea?: TextareaTheme
  notification?: NotificationTheme
  title?: TitleTheme
}
