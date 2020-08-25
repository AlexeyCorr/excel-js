import {$} from '../Dom'
import {ActiveRoute} from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.page = null
    this.$placeholder = $(selector)
    this.routes = routes
    this.changeHashHandler = this.changeHashHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changeHashHandler)
    this.changeHashHandler()
  }

  changeHashHandler() {
    this.page && this.page.destroy()
    this.$placeholder.clear()

    const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard
    this.page = new Page(ActiveRoute.param)

    this.$placeholder.append(this.page.getRoot())

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changeHashHandler)
  }
}
