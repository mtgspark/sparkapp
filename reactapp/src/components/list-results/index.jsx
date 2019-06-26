import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ListResultsItem from '../list-results-item'

const ListResults = ({ lists }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Labels</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Last edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {lists.map(list => (
          <ListResultsItem key={list.id} {...list} />
        ))}
      </TableBody>
    </Table>
  </Paper>
)

export default ListResults
