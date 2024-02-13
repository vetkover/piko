import {combineReducers, createStore} from 'redux'

import {whoami} from './reducers/whoami'
import {pikoset} from './reducers/pikoset'
import {flow} from './reducers/flow'

const rootStore = combineReducers({
    whoami: whoami,
    pikoset: pikoset,
    flow: flow
})
export const store = createStore(rootStore)