import type { App } from 'vue'
import ClIcon from './src/icon.vue'

ClIcon.install = (app: App): void => {
  app.component(ClIcon.name!, ClIcon)
}

export default ClIcon
