import type { App } from 'vue'
import ClPanel from './src/panel.vue'

ClPanel.install = (app: App): void => {
  app.component(ClPanel.name!, ClPanel)
}

export default ClPanel
