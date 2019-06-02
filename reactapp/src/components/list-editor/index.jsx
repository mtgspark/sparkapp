import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import { editableFields, fieldTypes } from '../../resources/lists'

const CardRow = ({ cardId }) => (
  <div>
    <figure className="card-wrapper text-center" align="center">
      <img src="https://via.placeholder.com/400x560" alt="mtg card" />
    </figure>
    <TextField name="" label="Card name" />
  </div>
)

const FieldFormInput = ({ label, name, value, onChange }) => {
  const field = editableFields[name]

  switch (field.type) {
    case fieldTypes.string:
      return (
        <TextField
          label={label}
          name={name}
          defaultValue={value}
          onChange={onChange}
        />
      )
    case fieldTypes.multiline:
      return (
        <TextField
          label={label}
          name={name}
          defaultValue={value}
          onChange={onChange}
          multiline
        />
      )
    case fieldTypes.date:
      return (
        <TextField label={label} type="date" name={name} defaultValue={value} />
      )
    case fieldTypes.array:
      return value.map(subValue => {
        if (name === editableFields.cards.name) {
          return <CardRow {...subValue} />
        } else {
          return 'Unknown array type'
        }
      })
    case fieldTypes.checkboxes:
      return (
        <span>
          {label}
          {field.options.map(optionValue => (
            <Chip
              key={optionValue}
              label={optionValue}
              color={value && value.contains(optionValue)}
              onClick={() => null}
            />
          ))}
        </span>
      )
    default:
      return <span>Unknown type: {name}</span>
  }
}

const ListEditor = ({ listId, fields = {}, saveList }) => {
  const [values, setValues] = useState({})

  const handleSubmit = event => {
    if (event) event.preventDefault()
    saveList(values)
  }

  const handleChange = event => {
    event.persist()
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <form>
      {Object.entries(editableFields)
        .filter(([name]) => name !== 'cards')
        .map(([name, { label, type }]) => (
          <label key={name}>
            <FieldFormInput
              label={label}
              name={name}
              value={fields[name]}
              onChange={handleChange}
            />
            <br />
          </label>
        ))}
      <button onClick={handleSubmit}>
        {listId ? 'Update List' : 'Create List'}
      </button>
    </form>
  )
}

export default ListEditor
