import {$} from '@core/Dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
  static className = 'table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(50)
  }

  onMousedown(evt) {
    const resizer = evt.target.dataset.resize

    if (resizer) {
      const $target = $(evt.target)
      const $parent = $target.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      let value

      const onColMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        if (resizer === 'col') {
          const delta = Math.round(moveEvt.clientX - coords.right)
          value = Math.round(coords.width + delta)
          $target.css({right: -delta + 'px'})
        } else {
          const delta = Math.floor(moveEvt.clientY - coords.bottom)
          value = Math.round(coords.height + delta)
          $target.css({bottom: -delta + 'px'})
        }
      }

      const onColMouseUp = (upEvt) => {
        upEvt.preventDefault();

        if (resizer === 'col') {
          $parent.css({width: value + 'px'})
          this.$root.findAll(`[data-col="${$parent.data.col}"]`)
              .forEach(el => el.style.width = value + 'px')
          $target.css({right: 0})
        } else {
          $parent.css({height: value + 'px'})
          $target.css({bottom: 0})
        }

        $target.$el.blur()

        document.removeEventListener('mousemove', onColMouseMove);
        document.removeEventListener('mouseup', onColMouseUp);
      }

      document.addEventListener('mousemove', onColMouseMove);
      document.addEventListener('mouseup', onColMouseUp);
    }
  }
}
