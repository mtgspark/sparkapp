import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import useDatabase from '../../hooks/useDatabase'
import useDatabaseSave from '../../hooks/useDatabaseSave'

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

const UsernameEditor = ({ auth }) => {
  if (!auth.uid) {
    return 'Not logged in - HOC should have redirected you'
  }

  const [isLoadingRecord, didLoadingRecordFail, record] = useDatabase(
    'users',
    auth.uid
  )

  const [isSaving, isSuccessOrFail, save] = useDatabaseSave('users', auth.uid)

  const [fieldValue, setFieldValue] = useState('')

  if (isLoadingRecord) {
    return 'Loading your details...'
  }

  if (didLoadingRecordFail || !record) {
    return 'Failed to load your details. Do you exist? :)'
  }

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
      <TextField
        value={fieldValue ? fieldValue : record ? record.username : ''}
        onChange={event => setFieldValue(event.target.value)}
      />
      <Button
        onClick={() =>
          save({
            username: fieldValue
          })
        }>
        Change
      </Button>
    </>
  )
}

export default connect(mapStateToProps)(UsernameEditor)
