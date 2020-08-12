import {toInlineStyles} from '@core/utils'

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 110
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function createCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id] || ''
    const styles = toInlineStyles(state.stylesState[id])
    return (
      `<div
        class="table__cell"
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        style="${styles}; width: ${width}"
        contenteditable
      >
        ${data}
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

function createRow(state, row, index) {
  const getResizeHandler = (needResize) => {
    return needResize
      ? '<button class="table__handler table__handler--row" data-resize="row" aria-label="Потяни за меня"></button>'
      : ''
  }
  const height = getHeight(state, index)

  return (
    `<div
      class="table__row"
      data-type="resizable"
      data-row="${index}"
      style="height: ${height}"
    >
      <div class="table__row-info">
        ${index ? index : ''}
        ${getResizeHandler(index)}
      </div>
      <div class="table__data">${row}</div>
    </div>`
  )
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state, index)
    }
  }
}

export function createTable(rowsCount = 15, state= {}) {
  const columnsCount = CODES.Z - CODES.A + 1
  const rows = []

  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(createColumn)
      .join('')

  rows.push(createRow({}, columns, null))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell(state, row))
        .join('')

    rows.push(createRow(state.rowState, cells, row + 1))
  }

  return rows.join('')
}
