const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 101

function createCell(state, row) {
  return function(_, col) {
    return (
      `<div 
        class="table__cell"
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        style="width: ${getWidth(state.colState, col)}"
        contenteditable
      >
      </div>`
    )
  }
}

function createColumn({col, index, width}) {
  return (
    `<div
      class="table__column" 
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
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

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state= {}) {
  const columnsCount = CODES.Z - CODES.A + 1
  const rows = []

  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createColumn)
      .join('')

  rows.push(createRow(null, columns))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell(state, row))
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
