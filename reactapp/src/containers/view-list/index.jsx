import React from 'react'
import SingleListView from '../../components/single-list-view'

const ViewList = ({ match: { params } }) => (
  <>
    <SingleListView listId={params.listId} />
  </>
)

export default ViewList
