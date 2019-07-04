import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import { Chip } from '@material-ui/core'
import FormattedDate from '../formatted-date'

const mapDispatchToProps = { push }

const ListsResultItem = ({ id, title, labels, createdAt, createdBy, push }) => {
  return (
    <Paper
      style={{ marginBottom: '1rem', padding: '0.5rem' }}
      onClick={() => push(`/lists/${id}`)}>
      <strong>{title}</strong> by {createdBy.username}
      <br />
      {labels !== null && labels.length
        ? labels.map(label => <Chip key={label} label={label} />)
        : null}
      <br />
      <span style={{ opacity: 0.6 }}>
        Created on <FormattedDate date={createdAt} />
      </span>
    </Paper>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(ListsResultItem)
