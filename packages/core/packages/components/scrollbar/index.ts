import type { App } from 'vue'
import ClScrollbar from './src/scrollbar.vue'

ClScrollbar.install = (app: App): void => {
  app.component(ClScrollbar.name!, ClScrollbar)
}

export default ClScrollbar
