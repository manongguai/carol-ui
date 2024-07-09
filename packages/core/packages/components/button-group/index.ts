import type { App } from 'vue'
import ClButtonGroup from './src/button-group.vue'

ClButtonGroup.install = (app: App): void => {
  app.component(ClButtonGroup.name!, ClButtonGroup)
}

export default ClButtonGroup
