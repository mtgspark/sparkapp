import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import { editableFields, fieldTypes } from '../../resources/lists'

const CardRow = ({ cardId, cardName, imageUrl, onChange }) => (
  <div>
    <figure className="card-wrapper text-center" align="center">
      <img src="https://via.placeholder.com/400x560" alt="mtg card" />
    </figure>
    <TextField label="Card name" />
    <br />
    <TextField label="Card ranking" type="number" min={1} max={20} />
  </div>
)

const objectify = (obj, [k, v]) => ({ ...obj, [k]: v })

const ArrayInput = ({ name, meta, onChange }) => (
  <div>
    {meta.value.map(arrayItem => {
      switch (name) {
        case editableFields.cards.name:
          return <CardRow {...arrayItem} onChange={onChange} />
        default:
          return 'Unknown field for array input'
      }
    })}
  </div>
)

const ListEditor = ({ listId, fieldsFromServer = {}, saveList }) => {
  const [formFields, setFormFields] = useState(
    Object.entries(editableFields)
      .map(([name, fieldDetails]) => [
        name,
        {
          ...fieldDetails,
          value: fieldsFromServer.name || fieldDetails.initialValue || null
        }
      ])
      .reduce(objectify, {})
  )

  const handleSubmit = event => {
    event.preventDefault()
    alert('Submit!')
  }

  const handleFieldUpdate = (name, newValue) => {
    const newFormFields = {
      ...formFields,
      [name]: newValue
    }

    setFormFields(newFormFields)
  }

  return (
    <form>
      {Object.entries(formFields).map(([name, formFieldMeta]) => {
        switch (formFieldMeta.type) {
          case fieldTypes.string:
          case fieldTypes.multiline:
            return (
              <>
                <TextField
                  label={formFieldMeta.label}
                  onChange={event =>
                    handleFieldUpdate(name, event.target.value)
                  }
                  multiline={formFieldMeta.type === fieldTypes.multiline}
                />
                <hr />
              </>
            )
          case fieldTypes.checkboxes:
            return (
              <>
                <InputLabel>{formFieldMeta.label}</InputLabel>
                {formFieldMeta.options
                  ? formFieldMeta.options.map(optionValue => (
                      <Chip
                        key={optionValue}
                        label={optionValue}
                        color={
                          formFieldMeta.value &&
                          formFieldMeta.value.includes(optionValue)
                            ? 'primary'
                            : ''
                        }
                        onClick={() => handleFieldUpdate(name, optionValue)}
                      />
                    ))
                  : null}
                <hr />
              </>
            )
          case fieldTypes.array:
            return (
              <>
                <InputLabel>{formFieldMeta.label}</InputLabel>
                <ArrayInput name={name} meta={formFieldMeta} />
                <hr />
              </>
            )
          default:
            return 'Unknown field type'
        }
      })}
      <Button onClick={handleSubmit}>
        {listId ? 'Update List' : 'Create List'}
      </Button>
    </form>
  )
}

export default ListEditor
