import {ExcelComponent} from '@core/ExcelComponent'
import {createHeader} from '@/components/header/header.template'
import * as actions from '@/redux/actions'
import {$} from '@core/Dom'

export class Header extends ExcelComponent {
  static className = 'header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['title'],
      ...options
    })
  }

  get template() {
    return createHeader(this.store.getState())
  }

  toHTML() {
    return this.template
  }

  updateTextInStore(value) {
    this.$dispatch(actions.setTitle({
      value
    }))
  }

  onInput(evt) {
    this.updateTextInStore($(evt.target).text())
  }
}
