import React, { useState } from 'react'
import { editableFields, fieldTypes } from '../../resources/lists'

const FieldFormInput = ({ name, value, onChange }) => {
  switch (editableFields[name].type) {
    case fieldTypes.string:
      return <textarea name={name} defaultValue={value} onChange={onChange} />
    case fieldTypes.date:
      return <input type="date" name={name} defaultValue={value} />
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
        .map(([name, { type }]) => (
          <label>
            {name}:{' '}
            <FieldFormInput
              name={name}
              value={fields[name]}
              onChange={handleChange}
            />
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
