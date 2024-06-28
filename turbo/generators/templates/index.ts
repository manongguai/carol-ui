import type { App } from 'vue'
import Cl{{upperCamelCaseName}} from './src/{{kebabCaseName}}.vue'

Cl{{upperCamelCaseName}}.install = (app: App): void => {
  app.component(Cl{{upperCamelCaseName}}.name!, Cl{{upperCamelCaseName}})
}

export default Cl{{upperCamelCaseName}}
