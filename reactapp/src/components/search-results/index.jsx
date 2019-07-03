import React from 'react'
import { connect } from 'react-redux'
import ListResults from '../list-results'
import useDatabaseSearch from '../../hooks/useDatabaseSearch'

const SearchResults = ({ searchTerm }) => {
  if (!searchTerm) return null

  const [isLoading, isErrored, results] = useDatabaseSearch(
    'lists',
    'keywords',
    'array-contains',
    searchTerm
  )

  if (isLoading || isErrored) return null

  if (!results.length) {
    return <p>No lists found matching your search term</p>
  }

  return <ListResults lists={results} />
}

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(SearchResults)
