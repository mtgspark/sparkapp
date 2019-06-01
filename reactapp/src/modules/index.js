import { combineReducers } from 'redux'
import counter from './counter'
import { rootReducer as listsReducer } from '../resources/lists'

export default combineReducers({
  counter,
  lists: listsReducer
})
