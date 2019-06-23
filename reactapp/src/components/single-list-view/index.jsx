import React, { useEffect, useState } from 'react'
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
  Avatar,
  Divider,
  Typography,
  Button
} from '@material-ui/core/'

const CardRow = ({ ranking, imageUrl, cardName, reason }) => {
  const useStyles = makeStyles({
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
      // fontWeight: '600'
    },
    reason: {
      margin: '2rem 0',
      fontStyle: 'italic'
    },
    divider: {
      marginTop: 'auto  '
    }
  })

  const classes = useStyles()

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <img className={classes.media} src={imageUrl} alt={cardName} />
      </ListItemAvatar>
      <ListItemText className={classes.listText}>
        <Typography gutterBottom component="h2" variant="h3">
          {cardName}
        </Typography>
        <Typography className={classes.cardRanking} gutterBottom component="p">
          <span class={classes.cardRankingValue}>{ranking}</span>
          <span class={classes.cardRankingTotal}>/10</span>
        </Typography>
        {reason ? (
          <Typography className={classes.reason} component="p" variant="h6">
            {reason}
          </Typography>
        ) : (
          ''
        )}
        {/* <Divider className={classes.divider} /> */}
      </ListItemText>
    </ListItem>
  )
}

const SingleListView = ({ listId }) => {
  const useStyles = makeStyles({
    media: {}
  })

  const classes = useStyles()

  const [isLoading, isErrored, result] = useDatabase('lists', listId)

  if (isLoading) {
    return <LoadingIcon />
  }

  if (isErrored || result === null) {
    return 'Error!'
  }

  const { title, description, cards } = result

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={8} align="left">
          <Typography component="h1" variant="">
            {title}
          </Typography>
          <Typography gutterBottom="true" component="p" variant="">
            {description}
          </Typography>
        </Grid>
        <Grid item xs={4} align="right">
          <Link to={`/lists/${listId}/edit`}>
            <Button color="primary">Edit List</Button>
          </Link>
        </Grid>
      </Grid>
      {/* list cards in list */}
      <List className={classes.root}>
        {cards.map((card, idx) => (
          <CardRow {...card} entryId={idx + 1} />
        ))}
      </List>
    </>
  )
}

export default SingleListView
