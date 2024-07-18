import type { ButtonTheme } from '@/components/button/styles'
import type { ColTheme } from '@/components/col/styles'
import type { ColorPickerTheme } from '@/components/color-picker/styles'
import type { DrawerTheme } from '@/components/drawer/styles'
import type { FormTheme } from '@/components/form/styles'
import type { FormItemTheme } from '@/components/form-item/styles'
import type { IconTheme } from '@/components/icon/styles'
import type { InputTheme } from '@/components/input/styles'
import type { InputGroupTheme } from '@/components/input-group/styles'
import type { InputNumberTheme } from '@/components/input-number/styles'
import type { NotificationTheme } from '@/components/notification/styles'
import type { PanelTheme } from '@/components/panel/styles'
import type { PopConfirmTheme } from '@/components/pop-confirm/styles'
import type { PopupTheme } from '@/components/popup/styles'
import type { RowTheme } from '@/components/row/styles'
import type { ScrollbarTheme } from '@/components/scrollbar/styles'
import type { StepTheme } from '@/components/step/styles'
import type { StepsTheme } from '@/components/steps/styles'
import type { TableTheme } from '@/components/table/styles'
import type { TableColumnTheme } from '@/components/table-column/styles'
import type { TextareaTheme } from '@/components/textarea/styles'
import type { TitleTheme } from '@/components/title/styles'

export interface CustomTheme {
  button?: ButtonTheme
  col?: ColTheme
  colorPicker?: ColorPickerTheme
  drawer?: DrawerTheme
  form?: FormTheme
  formItem?: FormItemTheme
  icon?: IconTheme
  input?: InputTheme
  inputGroup?: InputGroupTheme
  inputNumber?: InputNumberTheme
  notification?: NotificationTheme
  panel?: PanelTheme
  popConfirm?: PopConfirmTheme
  popup?: PopupTheme
  row?: RowTheme
  scrollbar?: ScrollbarTheme
  step?: StepTheme
  steps?: StepsTheme
  table?: TableTheme
  tableColumn?: TableColumnTheme
  textarea?: TextareaTheme
  title?: TitleTheme
}
