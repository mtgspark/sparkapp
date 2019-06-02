import React from 'react'
import { connect } from 'react-redux'
import ListResults from '../list-results'
import useDatabase from '../../hooks/useDatabase'

const SearchResults = ({ searchTerm }) => {
  if (!searchTerm) return null

  const [isLoading, isErrored, results] = useDatabase('lists', null, searchTerm)

  if (isLoading || isErrored) return null

  if (!results.length) {
    return 'No lists found matching  your search term'
  }

  return <ListResults lists={results} />
}

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(SearchResults)
