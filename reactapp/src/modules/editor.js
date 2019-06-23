const initialState = {
  listId: '',
  fields: {}
}

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

    case POPULATE_EDITOR:
      return {
        ...state,
        fields: action.payload.fields
      }

    default:
      return state
  }
}

// ACTIONS

const UPDATE_EDITOR_FIELD = 'UPDATE_EDITOR_FIELD'
export const updateEditorField = (name, value) => ({
  type: UPDATE_EDITOR_FIELD,
  payload: {
    name,
    value
  }
})

const POPULATE_EDITOR = 'POPULATE_EDITOR'
export const populateEditor = fields => ({
  type: POPULATE_EDITOR,
  payload: {
    fields
  }
})

export const publishEditorChanges = () => (dispatch, getState) => {
  if (getState().editor.listId) {
    alert('Creating list...')
  } else {
    alert('Editing list...')
  }
}
