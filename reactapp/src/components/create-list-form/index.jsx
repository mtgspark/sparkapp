import React from 'react'
import ListEditor from '../list-editor'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import withAuthProfile from '../../hocs/withAuthProfile'
import { trackAction, actions } from '../../analytics'

const CreateListForm = ({ auth }) => {
  const [isSaving, isSuccess, save] = useDatabaseSave('lists')
  const userId = auth.uid

  if (isSaving) {
    return 'Creating...'
  }

  if (isSuccess) {
    return 'List created successfully!'
  }

  return (
    <ListEditor
      saveList={async fields => {
        const [documentId] = await save(fields)

        trackAction(actions.CREATE_LIST, {
          listId: documentId,
          userId
        })
      }}
    />
  )
}

export default withAuthProfile(CreateListForm)
