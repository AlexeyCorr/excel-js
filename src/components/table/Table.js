import {$} from '@core/Dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, shouldResize, matrix, nextSelection} from '@/components/table/table.fanctions'
import {TableSelection} from '@/components/table/TableSelection'

export class Table extends ExcelComponent {
  static className = 'table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown']
    })
  }

  toHTML() {
    return createTable(50)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selection = new TableSelection()
    this.$cell = this.$root.find('[data-id="0:0"]')
    this.selection.select(this.$cell)
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      resizeHandler(this.$root, evt)
    } else if (isCell(evt)) {
      const $target = $(evt.target)

      if (evt.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(evt) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown'
    ]
    const {key} = evt

    if (keys.includes(key) && !evt.shiftKey) {
      evt.preventDefault()

      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelection(key, id))

      this.selection.select($next)
    }
  }
}
