import React from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from '../components/loading'
import useDatabase from '../hooks/useDatabase'

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

export default (Component, whichFlagName) =>
  connect(mapStateToProps)(({ auth, ...otherProps }) => {
    if (!whichFlagName) {
      return 'Need flag name to restrict access'
    }

    // On fresh load of a page we wait until firebase gets back to us
    if (!auth || !auth.isLoaded) {
      return <LoadingIndicator />
    }

    if (!auth.uid) {
      return 'You need to log in to do this'
    }

    const [isLoading, isErrored, user] = useDatabase('users', auth.uid)

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (isErrored || !user) {
      return 'Error fetching your details'
    }

    if (user[whichFlagName] !== true) {
      return 'Sorry you cannot access this area as this user'
    }

    return <Component {...otherProps} />
  })
