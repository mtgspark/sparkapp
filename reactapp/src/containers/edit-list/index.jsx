import React from 'react'
import EditListForm from '../../components/edit-list-form'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withEditorsOnly from '../../hocs/withEditorsOnly'

const EditList = ({ match: { params } }) => (
  <>
    <h1>Edit List</h1>
    <EditListForm listId={params.listId} />
  </>
)

export default withRedirectOnNotAuth(withEditorsOnly(EditList))
