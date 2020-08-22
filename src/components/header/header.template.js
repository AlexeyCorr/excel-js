function toButton(button) {
  return (
    `<button
      class="button-icon"
      title="${button.action}"
    >
      <span class='material-icons'>
        ${button.icon}
      </span>
    </button>`
  )
}

export function createHeader(state) {
  console.log('header ', state)
  const buttons = [
    {
      action: 'Удалить таблицу',
      icon: 'delete'
    },
    {
      action: 'Выйти',
      icon: 'exit_to_app'
    }
  ]

  return (
    `<input class="header__input" type="text" value="${state.title}">

    ${buttons.map(toButton).join('')}`
  )
}
