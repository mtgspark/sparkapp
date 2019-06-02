import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Moment from 'moment'

const ListsResultItem = ({ id, title, description, createdAt, modifiedAt, createdBy, modifiedBy }) => (
  <TableRow>
    <TableCell>
      {title}
    </TableCell>
    <TableCell>
      {createdBy.username}
    </TableCell>
    <TableCell>
      {Moment(createdAt).fromNow()}
    </TableCell>
  </TableRow>
)

export default ListsResultItem
