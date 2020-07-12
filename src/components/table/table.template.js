const CODES = {
  A: 65,
  Z: 90
}

function createCell(row) {
  return function(_, col) {
    return (
      `<div 
        class="table__cell"
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        contenteditable
      >
      </div>`
    )
  }
}

function createColumn(content, index) {
  return (
    `<div
      class="table__column" 
      data-type="resizable"
      data-col="${index}"
    >
      ${content}
      <button
        class="table__handler table__handler--col"
        data-resize="col"
        aria-label="Потяни за меня"
      >
      </button>
    </div>`
  )
}

function createRow(index, content) {
  const getResizeHandler = (needResize) => {
    return needResize
      ? '<button class="table__handler table__handler--row" data-resize="row" aria-label="Потяни за меня"></button>'
      : ''
  }

  return (
    `<div class="table__row" data-type="resizable">
      <div class="table__row-info">
        ${index ? index : ''}
        ${getResizeHandler(index)}
      </div>
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

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell(row))
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
