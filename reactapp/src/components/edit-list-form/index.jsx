import React, { useEffect } from 'react'
import LoadingIcon from '../../components/loading'
import ListEditor from '../list-editor'
import useDatabase from '../../hooks/useDatabase'
import useDatabaseSave from '../../hooks/useDatabaseSave'

const EditListForm = ({ listId }) => {
  const [isLoading, isErrored, result] = useDatabase('lists', listId)
  const [isSaving, isSuccess, save] = useDatabaseSave('lists', listId)

  if (isLoading) {
    return <LoadingIcon />
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
    <ListEditor listId={listId} fieldsFromServer={result} saveList={save} />
  )
}

export default EditListForm
