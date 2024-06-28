import ClTitle from './src/title.vue'

ClTitle.install = (app: any): void => {
  app.component(ClTitle.name, ClTitle)
}

export default ClTitle
