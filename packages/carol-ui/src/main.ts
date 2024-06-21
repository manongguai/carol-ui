import { createApp } from 'vue'
import App from './App.vue'
import CarolUI from '../packages'

const app = createApp(App)
app.use(CarolUI)
app.mount('#app')
