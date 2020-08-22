import {$} from '@core/Dom'

export function resizeHandler($root, evt) {
  return new Promise(resolve => {
    const $target = $(evt.target)
    const $parent = $target.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = evt.target.dataset.resize
    let value

    const onColMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      $target.$el.focus()

      if (type === 'col') {
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

      $target.$el.blur()

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
        $target.css({right: 0})
      } else {
        $parent.css({height: value + 'px'})
        $target.css({bottom: 0})
      }

      resolve({
        value,
        type,
        id: type === 'col' ? $parent.data.col : $parent.data.row
      })

      document.removeEventListener('mousemove', onColMouseMove);
      document.removeEventListener('mouseup', onColMouseUp);
    }

    document.addEventListener('mousemove', onColMouseMove);
    document.addEventListener('mouseup', onColMouseUp);
  })
}
