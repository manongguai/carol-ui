import type { App } from 'vue'
import ClFormItem from './src/form-item.vue'

ClFormItem.install = (app: App): void => {
  app.component(ClFormItem.name!, ClFormItem)
}

export default ClFormItem
