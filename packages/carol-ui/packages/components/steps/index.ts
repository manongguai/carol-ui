import type { App } from 'vue'
import ClSteps from './src/steps.vue'

ClSteps.install = (app: App): void => {
  app.component(ClSteps.name!, ClSteps)
}

export default ClSteps
