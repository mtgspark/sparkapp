import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import counter from './counter'
import app from './app'
import { reducer as editorReducer } from './editor'
import { metaReducer as analyticsMetaReducer } from '../analytics'

export default combineReducers({
  counter,
  app,
  editor: editorReducer,
  analytics: analyticsMetaReducer,
  firebase: firebaseReducer
})
