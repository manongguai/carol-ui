import { commonLight } from '../styles'
import type { BuiltInGlobalTheme } from './themes'

import { buttonLight } from '@/components/button/styles'
import { colLight } from '@/components/col/styles'
import { colorPickerLight } from '@/components/color-picker/styles'
import { drawerLight } from '@/components/drawer/styles'
import { formLight } from '@/components/form/styles'
import { formItemLight } from '@/components/form-item/styles'
import { iconLight } from '@/components/icon/styles'
import { inputLight } from '@/components/input/styles'
import { inputGroupLight } from '@/components/input-group/styles'
import { inputNumberLight } from '@/components/input-number/styles'
import { notificationLight } from '@/components/notification/styles'
import { panelLight } from '@/components/panel/styles'
import { popConfirmLight } from '@/components/pop-confirm/styles'
import { popupLight } from '@/components/popup/styles'
import { rowLight } from '@/components/row/styles'
import { scrollbarLight } from '@/components/scrollbar/styles'
import { stepLight } from '@/components/step/styles'
import { stepsLight } from '@/components/steps/styles'
import { tableLight } from '@/components/table/styles'
import { tableColumnLight } from '@/components/table-column/styles'
import { textareaLight } from '@/components/textarea/styles'
import { titleLight } from '@/components/title/styles'

export const lightTheme: BuiltInGlobalTheme = {
  name: 'light',
  common: commonLight,
  button: buttonLight,
  col: colLight,
  colorPicker: colorPickerLight,
  drawer: drawerLight,
  form: formLight,
  formItem: formItemLight,
  icon: iconLight,
  input: inputLight,
  inputGroup: inputGroupLight,
  inputNumber: inputNumberLight,
  notification: notificationLight,
  panel: panelLight,
  popConfirm: popConfirmLight,
  popup: popupLight,
  row: rowLight,
  scrollbar: scrollbarLight,
  step: stepLight,
  steps: stepsLight,
  table: tableLight,
  tableColumn: tableColumnLight,
  textarea: textareaLight,
  title: titleLight
}
