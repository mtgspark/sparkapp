import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { Chip } from '@material-ui/core'
import FormattedDate from '../formatted-date'

const mapDispatchToProps = { push }

const ListsResultItem = ({
  id,
  title,
  labels,
  description,
  createdAt,
  createdBy,
  modifiedAt,
  modifiedBy,
  push
}) => {
  const useStyles = makeStyles({
    tableRow: {
      cursor: 'pointer'
    }
  })

  const classes = useStyles()
  return (
    <TableRow className={classes.tableRow} onClick={() => push(`/lists/${id}`)}>
      <TableCell>
        <strong>{title}</strong>
      </TableCell>
      <TableCell>
        {labels !== null && labels.length
          ? labels.map(label => <Chip key={label} label={label} />)
          : '(none)'}
      </TableCell>
      <TableCell>{createdBy ? createdBy.username : '(unknown)'}</TableCell>
      <TableCell align="right">
        {createdAt ? <FormattedDate date={createdAt} /> : '(unknown)'}
      </TableCell>
    </TableRow>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(ListsResultItem)
