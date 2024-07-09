import type { App } from 'vue'
import ClPopConfirm from './src/pop-confirm.vue'

ClPopConfirm.install = (app: App): void => {
  app.component(ClPopConfirm.name!, ClPopConfirm)
}

export default ClPopConfirm
