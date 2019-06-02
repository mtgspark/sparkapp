const initialState = {
  isMenuOpen: false,
  searchTerm: ''
}

const TOGGLE_MENU = 'TOGGLE_MENU'
const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM'

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }

    case CHANGE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      }

    default:
      return state
  }
}

export const toggleMenu = () => ({
  type: TOGGLE_MENU
})

export const changeSearchTerm = searchTerm => ({
  type: CHANGE_SEARCH_TERM,
  payload: {
    searchTerm
  }
})
