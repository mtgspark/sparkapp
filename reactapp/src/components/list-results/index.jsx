import React from 'react'
import ListResultsItem from '../list-results-item'

const ListResults = ({ lists }) => lists.map(list => <ListResultsItem key={list.id} {...list} />)

export default ListResults
