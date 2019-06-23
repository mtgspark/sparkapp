import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEditorFieldValue } from '../../modules/editor'
import EditCardForm from '../edit-card-form'
import AddCardForm from '../add-card-form'

const EditableListOfCards = ({ field, saveFieldValue }) =>
  !field ? (
    'Waiting for field...'
  ) : (
    <>
      {field.value.map(card => (
        <EditCardForm
          key={card.id}
          {...card}
          onChange={cardDetails =>
            saveFieldValue(
              field.name,
              field.value.map(cardUnderTest => {
                if (cardUnderTest.id === cardDetails.id) {
                  return {
                    ...cardUnderTest,
                    ...cardDetails
                  }
                }
                return cardUnderTest
              })
            )
          }
        />
      ))}
      <AddCardForm fieldName={field.name} />
    </>
  )

const mapStateToProps = ({ editor: { fields } }, { fieldName }) => ({
  field: fields[fieldName]
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateEditorFieldValue
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableListOfCards)
