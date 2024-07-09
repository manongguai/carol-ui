import type { App } from 'vue'
import ClTextarea from './src/textarea.vue'

ClTextarea.install = (app: App): void => {
  app.component(ClTextarea.name!, ClTextarea)
}

export default ClTextarea
