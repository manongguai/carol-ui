import type { App } from 'vue'
import ClDrawer from './src/drawer.vue'

ClDrawer.install = (app: App): void => {
  app.component(ClDrawer.name!, ClDrawer)
}

export default ClDrawer
