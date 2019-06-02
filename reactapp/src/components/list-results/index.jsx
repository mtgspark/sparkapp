import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import ListResultsItem from '../list-results-item'

const ListResults = ({ lists }) => (
  <Paper>
    <Table>
      <TableBody>
        {lists.map(list => (
          <ListResultsItem key={list.id} {...list} />
        ))}
      </TableBody>
    </Table>
  </Paper>
)

export default ListResults
