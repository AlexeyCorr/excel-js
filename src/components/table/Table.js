import {$} from '@core/Dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, shouldResize, matrix, nextSelection} from '@/components/table/table.fanctions'
import {TableSelection} from '@/components/table/TableSelection'
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
  static className = 'table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(50, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(evt) {
    try {
      const data = await resizeHandler(this.$root, evt)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.error('Resize error', e)
    }
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      this.resizeTable(evt)
    } else if (isCell(evt)) {
      const $target = $(evt.target)

      if (evt.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
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
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(evt) {
    this.updateTextInStore($(evt.target).text())
  }
}
