import {$} from '@core/Dom'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {createToolbar} from '@/components/toolbar/toolbar.template'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  storeChanged(changes) {
    console.log('Store change', changes)
  }

  toHTML() {
    return this.template
  }

  onClick(evt) {
    const $target = $(evt.target).closest('[data-type=button]')

    if ($target.$el) {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)

      this.setState(value)
    }
  }
}
