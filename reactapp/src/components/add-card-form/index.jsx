import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { updateEditorFieldValue } from '../../modules/editor'
import { TextField, Button, Paper } from '@material-ui/core'
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

  const useStyles = makeStyles({
    paper: {
      padding: '1rem 2rem',
      margin: '2rem 0'
    }
  })

  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <strong>Add Card</strong>
      <TextField
        label="Card name"
        onChange={event => updateFieldData('cardName', event.target.value)}
        fullWidth
        gutterBottom
      />
      <TextField
        label="Scryfall card ID"
        onChange={event =>
          updateFieldData('scryfallCardId', event.target.value)
        }
        fullWidth
        gutterBottom
      />
      <TextField
        label="Image URL"
        onChange={event => updateFieldData('imageUrl', event.target.value)}
        fullWidth
        gutterBottom
      />
      <TextField
        label="Ranking (1 to 10)"
        onChange={event => updateFieldData('ranking', event.target.value)}
        gutterBottom
      />
      <TextField
        label="Reasons for rank"
        onChange={event => updateFieldData('reason', event.target.value)}
        fullWidth
        gutterBottom
      />
      <Button
        gutterTop
        variant="contained"
        color="primary"
        onClick={() => onSubmit()}>
        Add Card
      </Button>
    </Paper>
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
