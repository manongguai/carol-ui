import type { App } from 'vue'
import ClConfigProvider from './src/config-provider.vue'

ClConfigProvider.install = (app: App): void => {
  app.component(ClConfigProvider.name!, ClConfigProvider)
}

export default ClConfigProvider
