import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  title: 'Новая таблица',
  currentText: '',
  currentStyles: defaultStyles
}

export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState
