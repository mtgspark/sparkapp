import React from 'react'
import { connect } from 'react-redux'
import useDatabase from '../../hooks/useDatabase'
import CreateProfileForm from '../create-profile-form'
import UsernameEditor from '../username-editor'

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

const AccountSummary = ({ auth }) => {
  if (!auth.uid) {
    return 'Not logged in - HOC should have redirected you'
  }

  const [isLoadingRecord, didLoadingRecordFail, record] = useDatabase(
    'users',
    auth.uid
  )

  if (isLoadingRecord) {
    return 'Loading your details...'
  }

  if (didLoadingRecordFail) {
    return 'Failed to load your details. Please try again'
  }

  if (!record) {
    return <CreateProfileForm userId={auth.uid} />
  }

  return (
    <>
      Your username: {record.username}
      <br />
      Your user ID: {record.id}
      <br />
      Are you an editor: {record.isEditor ? 'Yes' : 'No'}
      <br />
      Are you an admin: {record.isAdmin ? 'Yes' : 'No'}
      <hr />
      <UsernameEditor userId={record.id} record={record} />
    </>
  )
}

export default connect(mapStateToProps)(AccountSummary)