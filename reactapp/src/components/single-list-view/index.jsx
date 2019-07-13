import React from 'react'
import { Link } from 'react-router-dom'
import useDatabase from '../../hooks/useDatabase'
import { makeStyles } from '@material-ui/core/styles'
import LoadingIcon from '../../components/loading'
import { Grid, List, Typography, Button, Chip } from '@material-ui/core'
import FormattedDate from '../formatted-date'
import CommentList from '../comment-list'
import AddCommentForm from '../add-comment-form'
import VotesList from '../votes-list'
import AddVoteForm from '../add-vote-form'
import FeatureListButton from '../feature-list-button'
import CardImage from '../card-image'
import * as routes from '../../routes'

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
    fontSize: '1.5rem',
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
    <>
      <Grid container>
        <Grid item xs={6} lg={2}>
          <CardImage imageUrl={imageUrl} />
        </Grid>
        <Grid item xs={6} lg={10} style={{ padding: '1rem' }}>
          <Typography
            className={classes.cardRanking}
            gutterBottom
            component="p">
            <span className={classes.cardRankingValue}>#{ranking}</span>
          </Typography>
          <Typography
            gutterBottom
            component="h2"
            variant="h3"
            style={{ fontSize: '1rem' }}>
            {cardName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {reason ? (
            <Typography className={classes.reason} component="p" variant="h6">
              {reason}
            </Typography>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </>
  )
}

const useSingleListViewStyles = makeStyles({
  media: {}
})

const SingleListView = ({ listId, small = false }) => {
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
      <Typography variant="h1" style={{ fontSize: small ? '1.5rem' : '3rem' }}>
        <Link to={routes.viewListWithVar.replace(':listId', listId)}>
          {title}
        </Link>
      </Typography>
      <Typography style={{ margin: '1rem 0' }} component="p">
        {description}
      </Typography>
      <div>
        {labels
          ? labels.map(label => <Chip key={label} label={label} />)
          : '(no labels)'}
      </div>
      <List style={{ marginTop: '2rem' }} className={classes.root}>
        {cards
          .sort(
            ({ ranking: rankingA }, { ranking: rankingB }) =>
              rankingA - rankingB
          )
          .map((card, idx) => (
            <CardRow key={card.scryfallCardId} {...card} entryId={idx + 1} />
          ))}
      </List>
      <br />
      <div>
        {small ? (
          <Link to={`/lists/${listId}`}>
            <Button color="primary">View List</Button>
          </Link>
        ) : (
          <Link to={`/lists/${listId}/edit`}>
            <Button color="primary">Edit List</Button>
          </Link>
        )}
      </div>
      <Typography component="p" style={{ margin: '1rem 0' }}>
        Created {createdAt ? <FormattedDate date={createdAt} /> : '(unknown)'}{' '}
        by {createdBy ? createdBy.username : '(unknown)'}
      </Typography>
      {modifiedBy && (
        <Typography component="p" style={{ margin: '1rem 0' }}>
          Last modified <FormattedDate date={modifiedAt} /> by{' '}
          {modifiedBy ? modifiedBy.username : '(unknown)'}
        </Typography>
      )}
      {!small && (
        <>
          <FeatureListButton listId={listId} />
          <Grid container>
            <Grid item xs={6}>
              <h2>Comments</h2>
              <CommentList listId={listId} />
              <h3>Add Comment</h3>
              <AddCommentForm listId={listId} />
            </Grid>
            <Grid item xs={6}>
              <h2>Votes</h2>
              <VotesList listId={listId} />
              <h3>Add Vote</h3>
              <AddVoteForm listId={listId} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default SingleListView
