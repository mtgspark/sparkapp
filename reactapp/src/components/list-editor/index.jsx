import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEditorField } from '../../modules/editor'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import { fieldTypes } from '../../resources/lists'
import EditableListOfCards from '../editable-list-of-cards'

const ArrayInput = ({ name, meta, value, onChange }) => {
  if (meta.arrayOf instanceof Array) {
    if (meta.arrayOf[0] === fieldTypes.object) {
      return <EditableListOfCards fieldName={name} />
    }
  }
  return 'Unknown array input'
}

const ListEditor = ({ listId, fields, updateEditorField, saveList }) => {
  const handleSubmit = event => {
    event.preventDefault()
    alert('Submit!')
  }

  const handleFieldUpdate = () => null

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
                    handleFieldUpdate(fieldName, event.target.value)
                  }
                  multiline={fieldDetails.type === fieldTypes.multiline}
                  value={fieldDetails.value}
                />
                <span>{fieldDetails.helpText}</span>
                <hr />
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
                        onClick={() =>
                          handleFieldUpdate(fieldName, optionValue)
                        }
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
                  onChange={value => handleFieldUpdate(fieldName, value)}
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
      updateEditorField
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListEditor)
