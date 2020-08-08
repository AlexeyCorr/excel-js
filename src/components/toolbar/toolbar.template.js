function toButton(button) {
  return (
    `<button
      class="button-icon ${button.active ? 'button-icon--active' : ''}" 
      title="${button.action}"
      data-type="button"
      data-value='${JSON.stringify(button.value)}'
    >
      <span class='material-icons'>
        ${button.icon}
      </span>
    </button>`
  )
}

export function createToolbar(state) {
  const buttons = [
    {
      action: 'По левому краю',
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      action: 'По центру',
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      action: 'По правому краю',
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'}
    },
    {
      action: 'Полужирный',
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      action: 'Курсив',
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      action: 'Подчерчивание',
      icon: 'format_underline',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'}
    }
  ]

  return buttons.map(toButton).join('')
}
