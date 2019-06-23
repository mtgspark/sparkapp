import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const AddCardForm = ({ onSubmit }) => {
  const [fieldData, setFieldData] = useState({})

  const updateFieldData = (name, value) => {
    setFieldData({
      ...fieldData,
      [name]: value
    })
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid grey' }}>
      <strong>Add Card</strong>
      <hr />
      <TextField
        label="Card name"
        onChange={event => updateFieldData('cardName', event.target.value)}
      />
      <hr />
      <TextField
        label="Scryfall card ID"
        onChange={event =>
          updateFieldData('scryfallCardId', event.target.value)
        }
      />
      <hr />
      <TextField
        label="Image URL"
        onChange={event => updateFieldData('imageUrl', event.target.value)}
      />
      <hr />
      <Button onClick={() => onSubmit(fieldData)}>Add Card</Button>
    </div>
  )
}

export default AddCardForm
