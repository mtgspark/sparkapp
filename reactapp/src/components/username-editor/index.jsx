import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import useDatabaseSave from '../../hooks/useDatabaseSave'

const UsernameEditor = ({ userId, record }) => {
  if (!userId) {
    return 'Need user ID to edit their username'
  }

  const [isSaving, isSuccessOrFail, save] = useDatabaseSave('users', userId)
  const [fieldValue, setFieldValue] = useState('')

  if (isSaving) {
    return 'Changing your username...'
  }

  if (isSuccessOrFail === true) {
    return 'Username has been changed successfully'
  }

  if (isSuccessOrFail === false) {
    return 'Failed to change your username. Probably a connection or permissions error'
  }

  return (
    <>
      Enter in your new name:{' '}
      <TextField onChange={event => setFieldValue(event.target.value)} /> <br />
      <Button
        onClick={() =>
          save({
            username: fieldValue
          })
        }>
        Change Name
      </Button>
    </>
  )
}

export default UsernameEditor
