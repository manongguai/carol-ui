import type { App } from 'vue'
import ClRow from './src/row.vue'

ClRow.install = (app: App): void => {
  app.component(ClRow.name!, ClRow)
}

export default ClRow
