import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

const mapDispatchToProps = { push }

const ListsResultItem = ({
  id,
  title,
  description,
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
      <TableCell>{description}</TableCell>
      <TableCell>{modifiedBy}</TableCell>
      <TableCell align="right">{Moment(modifiedAt).fromNow()}</TableCell>
    </TableRow>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(ListsResultItem)
