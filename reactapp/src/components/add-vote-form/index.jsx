import React, { useState } from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import withEditorsOnly from '../../hocs/withEditorsOnly'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../loading'

const AddVoteForm = ({ listId, auth }) => {
  if (!auth.uid) {
    return 'Not logged in - not good'
  }

  const userId = auth.uid

  const [textFieldValue, setTextFieldValue] = useState('')
  const [
    isLoadingExistingVote,
    isErroredExistingVote,
    existingVote
  ] = useDatabase('votes', null, [
    {
      field: 'createdBy',
      operator: '==',
      reference: {
        collection: 'users',
        id: auth.uid
      }
    },
    {
      field: 'list',
      operator: '==',
      reference: {
        collection: 'lists',
        id: listId
      }
    }
  ])
  const [isSaving, didSaveSucceedOrFail, save] = useDatabaseSave('votes')
  const [userDocument] = useDatabaseDocument('users', userId)
  const [listDocument] = useDatabaseDocument('lists', listId)

  if (isLoadingExistingVote) {
    return <LoadingIndicator />
  }

  if (isErroredExistingVote) {
    return 'Error checking if you already voted'
  }

  if (existingVote.length > 0) {
    console.log({ existingVote })
    return 'You have already voted for this list.'
  }

  if (isSaving) {
    return <LoadingIndicator />
  }

  if (didSaveSucceedOrFail === true) {
    return 'Vote added!'
  }

  if (didSaveSucceedOrFail === false) {
    return 'Error adding your vote. Please try again.'
  }

  return (
    <>
      Enter in a vote (number 1 to 10):{' '}
      <TextField
        multiline
        value={textFieldValue}
        onChange={event => setTextFieldValue(event.target.value)}
      />
      <br />
      <Button
        onClick={() =>
          save({
            list: listDocument,
            vote: textFieldValue,
            createdBy: userDocument,
            createdAt: new Date()
          })
        }>
        Add
      </Button>
    </>
  )
}

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

export default withEditorsOnly(connect(mapStateToProps)(AddVoteForm))
