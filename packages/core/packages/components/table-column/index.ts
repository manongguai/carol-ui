import type { App } from 'vue'
import ClTableColumn from './src/table-column.vue'

ClTableColumn.install = (app: App): void => {
  app.component(ClTableColumn.name!, ClTableColumn)
}

export default ClTableColumn
