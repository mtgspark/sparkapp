const initialState = {
  isMenuOpen: false,
  searchTerm: ''
}

const TOGGLE_MENU = 'TOGGLE_MENU'
const CLOSE_MENU = 'CLOSE_MENU'
const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM'

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }

    case CLOSE_MENU:
      return {
        ...state,
        isMenuOpen: false
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

// ACTIONS

export const toggleMenu = () => ({
  type: TOGGLE_MENU
})

export const closeMenu = () => ({
  type: CLOSE_MENU
})

export const changeSearchTerm = searchTerm => ({
  type: CHANGE_SEARCH_TERM,
  payload: {
    searchTerm
  }
})
