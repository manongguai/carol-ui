import type { App } from 'vue'
import ClButton from './src/button.vue'

ClButton.install = (app: App): void => {
  app.component(ClButton.name!, ClButton)
}

export default ClButton
