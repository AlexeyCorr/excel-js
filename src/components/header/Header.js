import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'header'

  toHTML() {
    return (
      `<input class="header__input" type="text" value="Новая таблица">

      <button class="button-icon" aria-label="Удалить">
        <span class='material-icons'>
          delete
        </span>
      </button>

      <button class="button-icon" aria-label="Выйти из приложения">
        <span class='material-icons'>
          exit_to_app
        </span>
      </button>`
    )
  }
}
