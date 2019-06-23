import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDatabase from '../../hooks/useDatabase'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Button
} from '@material-ui/core/'
import StarRateIcon from '@material-ui/icons/StarRate'

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
      margin: '2rem 0'
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

    // <Divider variant="inset" component="li" />
    // <li>
    //   <Card className={classes.card}>
    //     <CardMedia
    //       className={classes.media}
    //       image={imageUrl}
    //       title={cardName}
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="h2">
    //         {cardName}
    //       </Typography>
    //       {reason ? (
    //         <Typography component="p" variant="body2" color="textSecondary">
    //           {reason}
    //         </Typography>
    //       ) : (
    //         ''
    //       )}
    //     </CardContent>
    //   </Card>

    //   <Grid container className="" spacing={2}>
    //     <Grid item xs={6}>
    //       <figure className="card-wrapper text-center" align="center">
    //         <img
    //           className={classes.cardImage}
    //           src={imageUrl}
    //           alt="{cardName}"
    //         />
    //       </figure>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <p className={classes.cardRanking}>
    //         <span class={classes.cardRankingValue}>{ranking}</span>
    //         <span class={classes.cardRankingTotal}>/10</span>
    //       </p>
    //       <h2 className="card-name">{cardName}</h2>
    //       {reason ? <p>{reason}</p> : ''}
    //     </Grid>
    //   </Grid>
    // </li>
  )
}

const SingleListView = ({ listId }) => {
  const useStyles = makeStyles({
    media: {}
  })

  const classes = useStyles()

  const [isLoading, isErrored, result] = useDatabase('lists', listId)

  if (isLoading) {
    return 'Loading...'
  }

  if (isErrored || result === null) {
    return 'Error!'
  }

  const { title, description, cards } = result

  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <List className={classes.root}>
        {cards.map((card, idx) => (
          <CardRow {...card} entryId={idx + 1} />
        ))}
      </List>
      <Link to={`/lists/${listId}/edit`}>
        <Button>Edit List</Button>
      </Link>
    </>
  )
}

export default SingleListView
