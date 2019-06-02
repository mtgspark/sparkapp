const initialState = {
  listId: '',
  fields: {}
}

const UPDATE_EDITOR_FIELD = 'UPDATE_EDITOR_FIELD'

const updateField = (fields, name, value) => ({
  ...fields,
  [name]: value
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDITOR_FIELD:
      return {
        ...state,
        fields: updateField(
          state.fields,
          action.payload.name,
          action.payload.value
        )
      }

    default:
      return state
  }
}

export const updateEditorField = (name, value) => ({
  type: UPDATE_EDITOR_FIELD,
  payload: {
    name,
    value
  }
})

export const publishEditorChanges = () => (dispatch, getState) => {
  if (getState().editor.listId) {
    alert('Creating list...')
  } else {
    alert('Editing list...')
  }
}
