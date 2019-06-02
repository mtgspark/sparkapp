import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { editableFields, fieldTypes } from '../../resources/lists'

const FieldFormInput = ({ label, name, value, onChange }) => {
  switch (editableFields[name].type) {
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
      <label>Cards:</label>
      <button onClick={handleSubmit}>
        {listId ? 'Update List' : 'Create List'}
      </button>
    </form>
  )
}

export default ListEditor
