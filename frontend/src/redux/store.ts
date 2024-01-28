import {combineReducers, createStore} from 'redux'

import {whoami} from './reducers/whoami'
import {pikoset} from './reducers/pikoset'

const rootStore = combineReducers({
    whoami: whoami,
    pikoset: pikoset
})
export const store = createStore(rootStore)