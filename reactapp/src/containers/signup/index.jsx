import React from 'react'
import { connect } from 'react-redux'
import SignUpForm from '../../components/signup-form'
import withRedirectOnAuth from '../../hocs/withRedirectOnAuth'

const SignUp = () => (
  <>
    <h1>Sign Up</h1>
    <SignUpForm />
  </>
)

export default withRedirectOnAuth(SignUp)
