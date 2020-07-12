import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/Dom'

export class Formula extends ExcelComponent {
  static className = 'formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return (
      `<label class="formula__label">
        <input class="formula__field" type="text">
      </label>`
    )
  }

  init() {
    super.init()

    this.$formula = this.$root.find('input')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onInput(evt) {
    this.$emit('formula:input', $(evt.target).text())
  }

  onKeydown(evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault()
      this.$emit('formula:done')
    }
  }
}
