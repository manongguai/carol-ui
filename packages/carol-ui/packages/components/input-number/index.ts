import type { App } from 'vue'
import ClInputNumber from './src/input-number.vue'

ClInputNumber.install = (app: App): void => {
  app.component(ClInputNumber.name!, ClInputNumber)
}

export default ClInputNumber
