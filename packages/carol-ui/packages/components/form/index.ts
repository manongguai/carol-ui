import type { App } from 'vue'
import ClForm from './src/form.vue'

ClForm.install = (app: App): void => {
  app.component(ClForm.name!, ClForm)
}

export default ClForm

export type FormInstance = InstanceType<typeof ClForm>
