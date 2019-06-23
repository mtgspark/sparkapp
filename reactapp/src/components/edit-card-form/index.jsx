import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const SingleCardForm = ({
  scryfallCardId,
  cardName,
  imageUrl,
  ranking,
  onChange
}) => {
  console.log('SingleCardForm', scryfallCardId, cardName, imageUrl, ranking)

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
      <TextField label="Card name" value={cardName} />
      <hr />
      <TextField label="Image URL" value={imageUrl} />
      <hr />
      <TextField label="Scryfall card ID" value={scryfallCardId} />
      <hr />
      <TextField
        label="Card ranking"
        type="number"
        min={1}
        max={20}
        value={ranking}
      />
      <span>Number 1 to 10</span>
      <hr />
      <Button onClick={() => onChange(fieldData)}>Update</Button>
    </div>
  )
}

export default SingleCardForm
