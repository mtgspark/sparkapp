import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as listActions } from '../../resources/lists'

const ListsResultItem = ({ id, title, description, createdAt, modifiedAt, createdBy, modifiedBy }) => (
  <li>
    {title} by {createdBy}
  </li>
)

const Lists = ({ lists, fetchLists }) => {
  console.log(lists, fetchLists)

  useEffect(() => {
    fetchLists()
  }, [])

  if (!lists.length) {
    return 'No lists found'
  }

  return lists.map(list => <ListsResultItem key={list.id} {...list} />)
}

const mapStateToProps = ({ lists: { items } }) => ({ lists: items })

const mapDispatchToProps = dispatch => bindActionCreators({ fetchLists: listActions.fetchLists }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
