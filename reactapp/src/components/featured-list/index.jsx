import React from 'react'
import SingleListView from '../single-list-view'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../loading'
import { Typography } from '@material-ui/core'

const FeaturedList = () => {
  const [isFetching, isErrored, featuredList] = useDatabase(
    'special',
    'featuredList',
    null,
    false // disable refs
  )

  if (isFetching) {
    return <LoadingIndicator />
  }

  if (isErrored || !featuredList || !featuredList.listId) {
    return 'Failed to get featured list!'
  }

  const {
    listId: { id: listId }
  } = featuredList

  return (
    <>
      <Typography as="h1">Featured List</Typography>
      <SingleListView listId={listId} />
    </>
  )
}

export default FeaturedList
