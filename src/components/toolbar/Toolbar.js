import {ExcelComponent} from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static className = 'toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  toHTML() {
    return (
      `<button class="button-icon" aria-label="Выйти из приложения">
        <span class='material-icons'>
          format_align_center
        </span>
      </button>

      <button class="button-icon" aria-label="Выйти из приложения">
        <span class='material-icons'>
          format_align_right
        </span>
      </button>

      <button class="button-icon" aria-label="Выйти из приложения">
        <span class='material-icons'>
          format_align_left
        </span>
      </button>

      <button class="button-icon" aria-label="Выйти из приложения">
        <span class='material-icons'>
          format_bold
        </span>
      </button>

      <button class="button-icon" aria-label="Выйти из приложения">
        <span class='material-icons'>
          format_italic
        </span>
      </button>

      <button class="button-icon" aria-label="Выйти из приложения">
        <span class='material-icons'>
          format_underline
        </span>
      </button>`
    )
  }

  onClick(evt) {
    console.log(evt.target);
  }
}
