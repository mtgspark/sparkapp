import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as routes from '../../routes'
import LoginForm from '../../components/login-form'

const Login = ({ auth, history: { push } }) => {
  useEffect(() => {
    if (auth.uid) {
      push(routes.home)
    }
  })

  if (auth.uid) {
    return null
  }
  
  return (
    <>
      <h1>Login</h1>
      <LoginForm onSuccess={() => push(routes.home)} />
    </>
  )
}

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

export default connect(mapStateToProps)(Login)
