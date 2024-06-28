import type { App } from 'vue'
import ClInput from './src/input.vue'

ClInput.install = (app: App): void => {
  app.component(ClInput.name!, ClInput)
}

export default ClInput
