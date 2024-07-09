import type { App } from 'vue'
import ClCol from './src/col.vue'

ClCol.install = (app: App): void => {
  app.component(ClCol.name!, ClCol)
}

export default ClCol
