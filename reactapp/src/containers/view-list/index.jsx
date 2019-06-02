import React from 'react'
import SingleListView from '../../components/single-list-view'

const ViewList = ({ match: { params } }) => (
  <>
    <h1>View List</h1>
    <SingleListView listId={params.listId} />
  </>
)

export default ViewList
