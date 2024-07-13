import type { App } from 'vue'
import ClTable from './src/table.vue'

ClTable.install = (app: App): void => {
  app.component(ClTable.name!, ClTable)
}

export default ClTable
