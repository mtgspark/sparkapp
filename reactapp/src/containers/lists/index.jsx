import React from 'react'
import useDatabase from '../../hooks/useDatabase'

const ListsResultItem = ({ id, title, description, createdAt, modifiedAt, createdBy, modifiedBy }) => (
  <li>
    #{id} - {title}
  </li>
)

const Lists = () => {
  const [isLoading, isErrored, results] = useDatabase('lists')

  if (!results.length) {
    return 'No lists found'
  }

  if (isLoading) {
    return 'Loading...'
  }

  if (isErrored) {
    return 'Error!'
  }

  return results.map(list => <ListsResultItem key={list.id} {...list} />)
}

export default Lists
