import {storage} from '@core/utils'

function toHTML(key = []) {
  const id = key.split(':')[1]
  const model = storage(key)

  return (
    `<li class="dashboard__item">
      <a class="dashboard__link" href="#excel/${id}">
        <h3>${model.title}</h3>
        <span>${new Date(model.openedDate).toLocaleString()}</span>
      </a>
    </li>`
  )
}

function getKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createDashboardTable() {
  const keys = getKeys()

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`
  }
  return (
    `<div class="dashboard__row">
      <span>Название таблицы</span>
      <span>Дата создания</span>
    </div>

    <ul class="dashboard__list">
      ${keys.map(toHTML).join('')}
    </ul>`
  )
}
