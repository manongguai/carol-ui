import type { App } from 'vue'
import Cl_Component_ from './src/-component-.vue'

Cl_Component_.install = (app: App): void => {
  app.component(Cl_Component_.name!, Cl_Component_)
}

export default Cl_Component_
