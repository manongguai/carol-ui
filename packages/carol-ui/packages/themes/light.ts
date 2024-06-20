import { commonLight } from '../styles'
import type { BuiltInGlobalTheme } from './themes'

import { buttonLight } from '@/components/button/styles'
import { colorPickerLight } from '@/components/color-picker/styles'
import { iconLight } from '@/components/icon/styles'
import { inputLight } from '@/components/input/styles'
import { inputGroupLight } from '@/components/input-group/styles'
import { inputNumberLight } from '@/components/input-number/styles'
import { panelLight } from '@/components/panel/styles'
import { popConfirmLight } from '@/components/pop-confirm/styles'
import { popupLight } from '@/components/popup/styles'
import { stepLight } from '@/components/step/styles'
import { stepsLight } from '@/components/steps/styles'
import { textareaLight } from '@/components/textarea/styles'
import { titleLight } from '@/components/title/styles'
import { drawerLight } from '@/components/drawer/styles'

export const lightTheme: BuiltInGlobalTheme = {
  name: 'light',
  common: commonLight,
  button: buttonLight,
  colorPicker: colorPickerLight,
  icon: iconLight,
  input: inputLight,
  inputGroup: inputGroupLight,
  inputNumber: inputNumberLight,
  panel: panelLight,
  popConfirm: popConfirmLight,
  popup: popupLight,
  step: stepLight,
  steps: stepsLight,
  textarea: textareaLight,
  title: titleLight,
  drawer: drawerLight
}
