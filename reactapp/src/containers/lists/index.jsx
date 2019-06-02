import React from 'react'
import useDatabase from '../../hooks/useDatabase'
import ListResults from '../../components/list-results'

const Lists = () => {
  const [isLoading, isErrored, results] = useDatabase('lists')

  if (isLoading) {
    return 'Loading...'
  }

  if (isErrored) {
    return 'Error!'
  }

  return <ListResults lists={results} />
}

export default Lists
