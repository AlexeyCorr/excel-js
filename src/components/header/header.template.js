function toButton(button) {
  return (
    `<button
      class="button-icon"
      title="${button.title}"
      data-action="${button.action}"
    >
      <span class='material-icons'>
        ${button.icon}
      </span>
    </button>`
  )
}

export function createHeader(state) {
  const buttons = [
    {
      action: 'delete',
      title: 'Удалить таблицу',
      icon: 'delete'
    },
    {
      action: 'exit',
      title: 'Выйти',
      icon: 'exit_to_app'
    }
  ]

  return (
    `<input class="header__input" type="text" value="${state.title}">

    ${buttons.map(toButton).join('')}`
  )
}
