import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper, Grid } from '@material-ui/core'

const SingleCardForm = ({
  scryfallCardId,
  cardName,
  imageUrl,
  ranking,
  reason,
  onChange
}) => {
  const [fieldData, setFieldData] = useState({})

  const updateFieldData = (name, value) => {
    setFieldData({
      ...fieldData,
      [name]: value
    })
  }
  const useStyles = makeStyles({
    paper: {
      padding: '1rem 2rem',
      margin: '2rem 0'
    }
  })

  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <strong>{cardName}</strong>
      <figure className="card-wrapper text-center" align="center">
        <img src={imageUrl} alt="mtg card" width="150" />
      </figure>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Card name"
            value={cardName}
            onChange={event => updateFieldData('cardName', event.target.value)}
            fullWidth
            gutterBottom
          />
          <TextField
            label="Card ranking"
            type="number"
            min={1}
            max={10}
            value={ranking}
            onChange={event =>
              updateFieldData('cardRanking', event.target.value)
            }
            gutterBottom
          />
          <span>Number 1 to 10</span>
          <TextField
            label="Reason for ranking"
            type="text"
            value={reason}
            onChange={event => updateFieldData('reason', event.target.value)}
            fullWidth
            gutterBottom
            multiline
            placeholder="Why did you rank the card that number?"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={event => updateFieldData('imageUrl', event.target.value)}
            fullWidth
            gutterBottom
          />
          <TextField
            label="Scryfall card ID"
            value={scryfallCardId}
            onChange={event =>
              updateFieldData('scryfallCardId', event.target.value)
            }
            fullWidth
            gutterBottom
          />
        </Grid>
      </Grid>

      <Button onClick={() => onChange(fieldData)}>Update</Button>
    </Paper>
  )
}

export default SingleCardForm
