import React, { useState } from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import withEditorsOnly from '../../hocs/withEditorsOnly'

const AddCommentForm = ({ listId, auth }) => {
  if (!auth.uid) {
    return 'Not logged in - not good'
  }

  const userId = auth.uid

  const [textFieldValue, setTextFieldValue] = useState('')
  const [isSaving, didSaveSucceedOrFail, save] = useDatabaseSave('comments')
  const [userDocument] = useDatabaseDocument('users', userId)
  const [listDocument] = useDatabaseDocument('lists', listId)

  if (isSaving) {
    return 'Adding your comment...'
  }

  if (didSaveSucceedOrFail === true) {
    return 'Comment added!'
  }

  if (didSaveSucceedOrFail === false) {
    return 'Error adding your comment. Please try again.'
  }

  return (
    <>
      <strong>Add comment</strong>
      <br />
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
            comment: textFieldValue,
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

export default withEditorsOnly(connect(mapStateToProps)(AddCommentForm))
