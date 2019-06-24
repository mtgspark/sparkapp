import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper, Grid } from '@material-ui/core'

const useStyles = makeStyles({
  paper: {
    padding: '1rem 2rem',
    margin: '2rem 0'
  }
})

const SingleCardForm = ({
  scryfallCardId,
  cardName,
  imageUrl,
  ranking,
  reason,
  onChangeCardDetail,
  onRemoveCard
}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <strong>{cardName}</strong>
      <figure className="card-wrapper text-center" align="center">
        <img src={imageUrl} alt="mtg card" width="150" />
      </figure>
      <Grid container className={classes.root} spacing={2}>
        <Grid item>
          <TextField
            label="Card ranking"
            type="number"
            min={1}
            max={10}
            value={ranking}
            onChange={event =>
              onChangeCardDetail('ranking', event.target.value)
            }
          />
          <span>Number 1 to 10</span>
          <TextField
            label="Reason for ranking"
            type="text"
            value={reason}
            onChange={event => onChangeCardDetail('reason', event.target.value)}
            fullWidth
            multiline
            placeholder="Why did you rank the card that number?"
          />
          <br />
          <Button onClick={() => onRemoveCard({ scryfallCardId })}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SingleCardForm
