import GoogleTagManager from '@redux-beacon/google-tag-manager'
import { createMetaReducer, createMiddleware } from 'redux-beacon'

const options = {}

const locationChangeEvent = (action, prevState, nextState) => {
  return {
    event: 'location-change',
    payload: action.payload
  }
}

const eventsMap = {
  '@@router/LOCATION_CHANGE': locationChangeEvent
}

const gtm = GoogleTagManager(options)

const middleware = createMiddleware(eventsMap, gtm)
const metaReducer = createMetaReducer(eventsMap, gtm)

export { middleware, metaReducer }
