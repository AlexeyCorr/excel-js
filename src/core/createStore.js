import {clone} from '@core/utils'

export function createStore(rootReducer, initialState) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)

      return {
        unsubscribe() {
          listeners = listeners.map(l => l !== fn)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    getState() {
      return clone(state)
    }
  }
}
