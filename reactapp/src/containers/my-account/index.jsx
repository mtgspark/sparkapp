import React from 'react'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import UsernameEditor from '../../components/username-editor'
import AccountSummary from '../../components/account-summary'

const MyAccount = () => (
  <>
    <h1>Your account</h1>
    <hr />
    <AccountSummary />
    <hr />
    <UsernameEditor />
  </>
)

export default withRedirectOnNotAuth(MyAccount)
