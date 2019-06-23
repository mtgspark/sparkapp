import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEditorFieldValue } from '../../modules/editor'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { allFields } from '../../resources/lists'

const getNewCardDetailsInitialState = fieldName =>
  Object.keys(allFields[fieldName].arrayOf[1]).reduce(
    (newObj, subFieldName) => ({ ...newObj, [subFieldName]: '' }),
    {}
  )

const AddCardForm = ({ field, saveFieldValue }) => {
  const [newCardDetails, setNewCardDetails] = useState(
    getNewCardDetailsInitialState(field.name)
  )

  const updateFieldData = (name, value) => {
    setNewCardDetails({
      ...newCardDetails,
      [name]: value
    })
  }

  const onSubmit = () => {
    const invalidFields = Object.values(newCardDetails).filter(
      fieldValue => !fieldValue
    )

    if (invalidFields.length) {
      // render something
      console.error('Failed to add card to form: one or more fields are empty!')
      return
    }

    saveFieldValue(field.name, field.value.concat([newCardDetails]))
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
      <TextField
        label="Ranking (out of 10)"
        onChange={event => updateFieldData('ranking', event.target.value)}
      />
      <hr />
      <TextField
        label="Reasons for rank"
        onChange={event => updateFieldData('reason', event.target.value)}
      />
      <hr />
      <Button onClick={() => onSubmit()}>Add Card</Button>
    </div>
  )
}

const mapStateToProps = ({ editor: { fields } }, { fieldName }) => ({
  field: fields[fieldName]
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveFieldValue: updateEditorFieldValue
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCardForm)
