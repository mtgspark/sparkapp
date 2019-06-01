import { combineReducers } from 'redux'
import counter from './counter'
import { rootReducer as listsReducer } from '../resources/lists'
import { metaReducer as analyticsMetaReducer } from '../analytics'

export default combineReducers({
  counter,
  lists: listsReducer,
  analytics: analyticsMetaReducer
})
