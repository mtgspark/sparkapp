import React from 'react'
import CardLookupForm from '../../components/card-lookup-form'
import EditListForm from '../../components/edit-list-form'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'

const EditList = ({ match: { params } }) => (
  <>
    <h1>Edit List</h1>
    <CardLookupForm />
    <EditListForm listId={params.listId} />
  </>
)

export default withRedirectOnNotAuth(EditList)
