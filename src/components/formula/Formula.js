import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    })
  }

  toHTML() {
    return (
      `<label class="formula__label">
        <input type="text" class="formula__field">
      </label>`
    )
  }

  onInput(evt) {
    console.log(evt.target.value);
  }
}
