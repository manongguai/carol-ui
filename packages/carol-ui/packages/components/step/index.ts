import type { App } from 'vue'
import ClStep from './src/step.vue'

ClStep.install = (app: App): void => {
  app.component(ClStep.name!, ClStep)
}

export default ClStep
