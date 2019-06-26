import React from 'react'
import { Link } from 'react-router-dom'
import useDatabase from '../../hooks/useDatabase'
import { makeStyles } from '@material-ui/core/styles'
import LoadingIcon from '../../components/loading'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Button,
  Chip
} from '@material-ui/core'
import moment from 'moment'

const useCardRowStyles = makeStyles({
  media: {},
  listText: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    padding: '2rem'
  },
  cardImage: {
    maxWidth: '100%',
    height: 'auto'
  },
  cardRanking: {
    fontSize: '1rem',
    lineHeight: '1'
  },
  cardRankingValue: {
    fontSize: '3rem'
  },
  reason: {
    margin: '2rem 0',
    fontStyle: 'italic'
  },
  divider: {
    marginTop: 'auto'
  }
})

const CardRow = ({ ranking, imageUrl, cardName, reason }) => {
  const classes = useCardRowStyles()

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <img
          className={classes.media}
          src={imageUrl}
          alt={cardName}
          width="300"
        />
      </ListItemAvatar>
      <ListItemText className={classes.listText}>
        <Typography gutterBottom component="h2" variant="h3">
          {cardName}
        </Typography>
        <Typography className={classes.cardRanking} gutterBottom component="p">
          <span className={classes.cardRankingValue}>#{ranking}</span>
        </Typography>
        {reason ? (
          <Typography className={classes.reason} component="p" variant="h6">
            {reason}
          </Typography>
        ) : (
          ''
        )}
      </ListItemText>
    </ListItem>
  )
}

const useSingleListViewStyles = makeStyles({
  media: {}
})

const SingleListView = ({ listId }) => {
  const classes = useSingleListViewStyles()

  const [isLoading, isErrored, result] = useDatabase('lists', listId)

  if (isLoading) {
    return <LoadingIcon />
  }

  if (isErrored || result === null) {
    return 'Error!'
  }

  const {
    title,
    description,
    cards,
    createdAt,
    createdBy,
    labels,
    modifiedAt,
    modifiedBy
  } = result

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={8} align="left">
          <Typography variant="h1" style={{ fontSize: '3rem' }}>
            {title}
          </Typography>
          <Typography component="p" style={{ margin: '1rem 0' }}>
            Created on{' '}
            {createdAt ? moment(createdAt).toLocaleString() : '(unknown)'} by{' '}
            {createdBy ? createdBy.username : '(unknown)'}
          </Typography>
          {modifiedBy && (
            <Typography component="p" style={{ margin: '1rem 0' }}>
              Last modified on {moment(modifiedAt).toLocaleString()} by{' '}
              {modifiedBy ? modifiedBy.username : '(unknown)'}
            </Typography>
          )}
          <Typography gutterBottom={true} component="p">
            {description}
          </Typography>
          <div>
            {labels
              ? labels.map(label => <Chip key={label} label={label} />)
              : '(no labels)'}
          </div>
        </Grid>
        <Grid item xs={4} align="right">
          <Link to={`/lists/${listId}/edit`}>
            <Button color="primary">Edit List</Button>
          </Link>
        </Grid>
      </Grid>
      <List className={classes.root}>
        {cards.map((card, idx) => (
          <CardRow key={card.scryfallCardId} {...card} entryId={idx + 1} />
        ))}
      </List>
    </>
  )
}

export default SingleListView
