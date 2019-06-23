import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEditorField } from '../../modules/editor'
import EditCardForm from '../edit-card-form'
import AddCardForm from '../add-card-form'

const EditableListOfCards = ({ field, updateEditorField }) =>
  !field
    ? 'Waiting for field...'
    : !console.log('EditableListOfCards.field', field) && (
        <>
          {field.value.map(card => (
            <EditCardForm
              key={card.id}
              {...card}
              onChange={cardDetails =>
                updateEditorField(field.name, {
                  ...field,
                  value: field.value.map(cardUnderTest => {
                    if (cardUnderTest.id === cardDetails.id) {
                      return {
                        ...cardUnderTest,
                        ...cardDetails
                      }
                    }
                    return cardUnderTest
                  })
                })
              }
            />
          ))}
          <AddCardForm />
        </>
      )

const mapStateToProps = ({ editor: { fields } }, { fieldName }) =>
  !console.log('EditableListOfCards', fieldName, fields) && {
    field: fields[fieldName]
  }

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
)(EditableListOfCards)
