import React from 'react'
import CreateListForm from '../../components/create-list-form'
import CardLookupForm from '../../components/card-lookup-form'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'

const CreateList = () => (
  <>
    <h1>Create List</h1>
    <CardLookupForm />
    <CreateListForm />
  </>
)

export default withRedirectOnNotAuth(CreateList)
