import React from 'react'
import ListEditor from '../list-editor'
import useDatabase from '../../hooks/useDatabase'
import useDatabaseSave from '../../hooks/useDatabaseSave'

const EditListForm = ({ listId }) => {
  const [isLoading, isErrored, result] = useDatabase('lists', listId)
  const [isSaving, isSuccess, save] = useDatabaseSave('lists', listId)

  if (isLoading) {
    return 'Loading...'
  }

  if (isErrored || result === null) {
    return 'Error!'
  }

  if (isSaving) {
    return 'Saving...'
  }

  if (isSuccess) {
    return 'Saved successfully!'
  }

  return (
    <ListEditor
      listId={listId}
      fieldsFromServer={result}
      saveList={newFields => save(newFields)}
    />
  )
}

export default EditListForm
