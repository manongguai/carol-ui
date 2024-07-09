import ClPopup from './src/popup.vue'

ClPopup.install = (app: any): void => {
  app.component(ClPopup.name, ClPopup)
}

export default ClPopup
