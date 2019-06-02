import React from 'react'
import ListEditor from '../list-editor'
import useDatabaseSave from '../../hooks/useDatabaseSave'

const CreateListForm = () => {
  const [isSaving, isSuccess, save] = useDatabaseSave('lists')

  if (isSaving) {
    return 'Creating...'
  }

  if (isSuccess) {
    return 'List created successfully!'
  }

  return <ListEditor saveList={newFields => save(newFields)} />
}

export default CreateListForm
