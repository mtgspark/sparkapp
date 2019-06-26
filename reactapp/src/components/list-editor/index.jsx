import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEditorFieldValue } from '../../modules/editor'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import { fieldTypes } from '../../resources/lists'
import EditableListOfCards from '../editable-list-of-cards'
import { editableFields } from '../../resources/lists'
import { populateEditor } from '../../modules/editor'

const mergeInRawFields = (fields = null) =>
  Object.entries(editableFields)
    .map(([fieldName, fieldDetails]) => [
      fieldName,
      {
        ...fieldDetails,
        value: fields
          ? fields[fieldName]
          : fieldDetails.type === fieldTypes.array
          ? []
          : null
      }
    ])
    .reduce(
      (newObj, [fieldName, fieldDetails]) => ({
        ...newObj,
        [fieldName]: fieldDetails
      }),
      {}
    )

const convertFieldsIntoFirebaseDoc = fields =>
  Object.entries(fields)
    .map(([fieldName, fieldDetails]) => [fieldName, fieldDetails.value])
    .reduce(
      (newObj, [fieldName, fieldValue]) => ({
        ...newObj,
        [fieldName]: fieldValue
      }),
      {}
    )

const ArrayInput = ({ name, meta, value, onChange }) => {
  if (meta.arrayOf instanceof Array) {
    if (meta.arrayOf[0] === fieldTypes.object) {
      return <EditableListOfCards fieldName={name} />
    }
  }
  return 'Unknown array input'
}

const ListEditor = ({
  fields,
  listId,
  fieldsFromServer = null,
  saveFieldValue,
  populateEditor,
  saveList
}) => {
  useEffect(() => {
    populateEditor(mergeInRawFields(fieldsFromServer))
  }, [fieldsFromServer])

  const handleSubmit = event => {
    saveList(convertFieldsIntoFirebaseDoc(fields))
    event.preventDefault()
  }

  console.log('ListEditor.fields', fields)

  return (
    <form>
      {Object.entries(fields).map(([fieldName, fieldDetails]) => {
        switch (fieldDetails.type) {
          case fieldTypes.string:
          case fieldTypes.multiline:
            return (
              <React.Fragment key={fieldName}>
                <TextField
                  label={fieldDetails.label}
                  onChange={event =>
                    saveFieldValue(fieldName, event.target.value)
                  }
                  multiline={fieldDetails.type === fieldTypes.multiline}
                  fullWidth
                  value={fieldDetails.value}
                  margin="normal"
                />
                <span>{fieldDetails.helpText}</span>
              </React.Fragment>
            )
          case fieldTypes.checkboxes:
            return (
              <React.Fragment key={fieldName}>
                <InputLabel>{fieldDetails.label}</InputLabel>
                <span>{fieldDetails.helpText}</span>
                {fieldDetails.options
                  ? fieldDetails.options.map(optionValue => (
                      <Chip
                        key={optionValue}
                        label={optionValue}
                        color={
                          fieldDetails.value &&
                          fieldDetails.value.includes(optionValue)
                            ? 'primary'
                            : 'default'
                        }
                        onClick={() => saveFieldValue(fieldName, optionValue)}
                      />
                    ))
                  : null}
                <hr />
              </React.Fragment>
            )
          case fieldTypes.array:
            return (
              <React.Fragment key={fieldName}>
                <InputLabel>{fieldDetails.label}</InputLabel>
                <ArrayInput
                  name={fieldName}
                  meta={fieldDetails}
                  value={fieldDetails.value}
                  onChange={value => saveFieldValue(fieldName, value)}
                />
                <hr />
              </React.Fragment>
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

const mapStateToProps = ({ editor: { fields } }) => ({ fields })

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveFieldValue: updateEditorFieldValue,
      populateEditor
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListEditor)
