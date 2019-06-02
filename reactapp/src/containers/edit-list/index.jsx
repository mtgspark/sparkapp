import React from 'react'
import EditListForm from '../../components/edit-list-form'

const EditList = ({ match: { params } }) => (
  <>
    <h1>Edit List</h1>
    <EditListForm listId={params.listId} />
  </>
)

export default EditList
