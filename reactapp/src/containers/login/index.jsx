import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as routes from '../../routes'
import LoginForm from '../../components/login-form'
import withRedirectOnAuth from '../../hocs/withRedirectOnAuth'

const Login = ({ push }) => (
  <>
    <h1>Login or Sign Up</h1>
    <p>Enter your details below to login or create a new account.</p>
    <LoginForm onSuccess={() => push(routes.home)} />
  </>
)

export default connect(
  null,
  { push }
)(withRedirectOnAuth(Login))
