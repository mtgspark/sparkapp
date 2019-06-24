import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoadingIcon from '../../components/loading'
import { populateEditor } from '../../modules/editor'
import ListEditor from '../list-editor'
import useDatabase from '../../hooks/useDatabase'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import { editableFields } from '../../resources/lists'

const mergeInRawFields = fields =>
  Object.entries(editableFields)
    .map(([fieldName, fieldDetails]) => [
      fieldName,
      {
        ...fieldDetails,
        value: fields[fieldName]
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

const EditListForm = ({ listId, populateEditor, fields }) => {
  const [isLoading, isErrored, result] = useDatabase('lists', listId)
  const [isSaving, isSuccess, save] = useDatabaseSave('lists', listId)

  useEffect(() => {
    if (!result) {
      console.warn(
        'EditListForm.useEffect cannot populate because no data',
        result
      )
      return
    }

    populateEditor(mergeInRawFields(result))
  }, [populateEditor, isLoading, result])

  if (isLoading) {
    return <LoadingIcon />
  }

  if (isErrored || result === null) {
    return 'Error!'
  }

  if (isSaving) {
    return 'Saving...'
  }

  if (isSuccess) {
    return 'Saved successfully!'
  }

  if (!fields) {
    return 'Populating editor...'
  }

  return (
    <ListEditor
      listId={listId}
      fieldsFromServer={result}
      saveList={newFields => save(convertFieldsIntoFirebaseDoc(newFields))}
    />
  )
}

const mapStateToProps = ({ editor: { fields } }) => ({ fields })

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      populateEditor
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditListForm)
