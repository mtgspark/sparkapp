import React from 'react'
import CreateListForm from '../../components/create-list-form'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'

const CreateList = () => (
  <>
    <h1>Create List</h1>
    <CreateListForm />
  </>
)

export default withRedirectOnNotAuth(CreateList)
