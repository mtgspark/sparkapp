import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import firebase from 'firebase/app'
import { loggedInUserId } from './firebase'
import ReactReduxFirebaseProvider from 'react-redux-firebase/lib/ReactReduxFirebaseProvider'
import store, { history } from './store'
import App from './containers/app'
import { trackAction, actions } from './analytics'
import * as Sentry from '@sentry/browser'

import 'sanitize.css/sanitize.css'
import './assets/css/theme.css'
import './assets/css/mana.min.css'

Sentry.init({
  dsn: 'https://eefc3e7e553546a0bf725a90f3048ae9@sentry.io/1509721'
})

history.listen(location => {
  trackAction(actions.NAVIGATE, {
    location,
    userId: loggedInUserId.uid
  })
})

const target = document.querySelector('#root')

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </ConnectedRouter>
  </Provider>,
  target
)
