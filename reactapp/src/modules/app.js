const initialState = {
  isMenuOpen: false
}

const TOGGLE_MENU = 'TOGGLE_MENU'

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }

    default:
      return state
  }
}

export const toggleMenu = () => ({
  type: TOGGLE_MENU
})
