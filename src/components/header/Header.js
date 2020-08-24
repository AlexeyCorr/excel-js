import {ExcelComponent} from '@core/ExcelComponent'
import {createHeader} from '@/components/header/header.template'
import * as actions from '@/redux/actions'
import {$} from '@core/Dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick(evt) {
    const $target = $(evt.target).closest('.button-icon')

    if ($target.$el) {
      switch ($target.data.action) {
        case 'delete':
          if (confirm('Вы действительно хотите удалить таблицу?')) {
            localStorage.removeItem(`excel:${ActiveRoute.param}`)
            ActiveRoute.navigate('')
          }
          break

        case 'exit':
          ActiveRoute.navigate('')
          break
      }
    }
  }

  onInput(evt) {
    this.updateTextInStore($(evt.target).text())
  }
}
