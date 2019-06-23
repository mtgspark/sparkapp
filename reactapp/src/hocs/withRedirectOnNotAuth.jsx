import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import * as routes from '../routes'

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

const mapDispatchToProps = { push }

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withRouter(({ auth, push }) => {
      useEffect(() => {
        if (!auth.uid) {
          console.log('withRedirectOnNotAuth', auth.uid)
          push(routes.login)
        }
      }, [auth, push])

      if (!auth.uid) {
        return null
      }

      return <Component />
    })
  )
