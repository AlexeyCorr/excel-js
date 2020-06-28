const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `<div class="table__cell" contenteditable></div>`
}

function createColumn(content) {
  return (
    `<div class="table__column">
      ${content}
    </div>`
  )
}

function createRow(index, content) {
  return (
    `<div class="table__row">
      <div class="table__row-info">${index ? index : ''}</div>
      <div class="table__data">${content}</div>
    </div>`
  )
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const columnsCount = CODES.Z - CODES.A + 1
  const rows = []

  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')
    
  rows.push(createRow(null, columns))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell)
        .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
