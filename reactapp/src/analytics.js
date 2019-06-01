import GoogleTagManager from '@redux-beacon/google-tag-manager'
import { createMetaReducer, createMiddleware } from 'redux-beacon'

const options = {
  dataLayerName: 'my-data-layer'
}

const editListEvent = (action, prevState, nextState) => {
  return {
    event: 'edit-list',
    listId: action.payload.listId
  }
}

const eventsMap = {
  'EDIT_LIST': editListEvent
}

const gtm = GoogleTagManager(options)

const middleware = createMiddleware(eventsMap, gtm)
const metaReducer = createMetaReducer(eventsMap, gtm)

export { middleware, metaReducer }
