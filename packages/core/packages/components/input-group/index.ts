import type { App } from 'vue'
import ClInputGroup from './src/input-group.vue'

ClInputGroup.install = (app: App): void => {
  app.component(ClInputGroup.name!, ClInputGroup)
}

export default ClInputGroup
