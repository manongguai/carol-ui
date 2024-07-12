import type { App } from 'vue'
export * from './types'
import { clComponents } from './components/components'
import type { LibraryOptions } from './types'
import { setZIndex } from './hooks/use-zindex'
export * from './components/components'
export { lightTheme } from './themes'

if (typeof window !== 'undefined') {
  // 动态导入 Iconfont.js
  // @ts-ignore
  import(/* webpackChunkName: "iconfont" */ './fonts/font.js')
    .then(() => {
      // 图标库加载完成后的处理
    })
    .catch((error) => {
      console.error('Failed to load iconfont.js', error)
    })
}

const install = (app: App, opts: LibraryOptions = {}): void => {
  setZIndex(opts.zIndex || 2000)
  clComponents.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}
export default {
  install
}
