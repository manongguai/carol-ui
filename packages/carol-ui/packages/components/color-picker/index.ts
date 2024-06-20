import type { App } from 'vue'
import ClColorPicker from './src/color-picker.vue'

ClColorPicker.install = (app: App): void => {
  app.component(ClColorPicker.name!, ClColorPicker)
}

export default ClColorPicker
