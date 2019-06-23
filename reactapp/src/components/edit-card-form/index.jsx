import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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

  return (
    <div style={{ padding: '1rem', border: '1px solid grey' }}>
      <strong>{cardName}</strong>
      <figure className="card-wrapper text-center" align="center">
        <img src={imageUrl} alt="mtg card" width="150" />
      </figure>
      <hr />
      <TextField
        label="Card name"
        value={cardName}
        onChange={event => updateFieldData('cardName', event.target.value)}
      />
      <hr />
      <TextField
        label="Image URL"
        value={imageUrl}
        onChange={event => updateFieldData('imageUrl', event.target.value)}
      />
      <hr />
      <TextField
        label="Scryfall card ID"
        value={scryfallCardId}
        onChange={event =>
          updateFieldData('scryfallCardId', event.target.value)
        }
      />
      <hr />
      <TextField
        label="Card ranking"
        type="number"
        min={1}
        max={20}
        value={ranking}
        onChange={event => updateFieldData('cardRanking', event.target.value)}
      />
      <span>Number 1 to 10</span> <hr />
      <TextField
        label="Reason for ranking"
        type="text"
        value={reason}
        onChange={event => updateFieldData('reason', event.target.value)}
      />
      <span>Why did you rank the card that number?</span>
      <hr />
      <Button onClick={() => onChange(fieldData)}>Update</Button>
    </div>
  )
}

export default SingleCardForm
