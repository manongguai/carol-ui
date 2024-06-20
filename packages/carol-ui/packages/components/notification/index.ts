import type { App } from 'vue'
import Notify from './src/notify'

const install = (app: App) => {
  app.config.globalProperties['$ClNotify'] = Notify
}

const ClNotification = Notify as any
ClNotification.install = install

export default ClNotification
export * from './src/notification'
