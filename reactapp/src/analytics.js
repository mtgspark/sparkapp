import { inDevelopment } from './environment'

const categories = {
  ROUTING: 'Routing',
  AUTH: 'Auth',
  LISTS: 'Lists'
}

export const actions = {
  // APP
  NAVIGATE: 'Navigate',
  OPEN_NAV_MENU: 'OpenNavMenu',
  CLOSE_NAV_MENU: 'CloseNavMenu',

  // AUTH
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  SIGNUP: 'SignUp',

  // SEARCH
  FOCUS_SEARCH: 'FocusSearch',
  CHANGE_SEARCH_TERM: 'ChangeSearchTerm',

  // DOCUMENTS
  CREATE_DOCUMENT: 'CreateDocument',
  EDIT_DOCUMENT: 'EditDocument'
}

const actionDetails = {
  // ROUTING

  [actions.NAVIGATE]: {
    category: categories.ROUTING
  },
  [actions.OPEN_NAV_MENU]: {
    category: categories.ROUTING
  },
  [actions.CLOSE_NAV_MENU]: {
    category: categories.ROUTING
  },

  // AUTH

  [actions.LOGIN]: {
    category: categories.AUTH
  },
  [actions.LOGOUT]: {
    category: categories.AUTH
  },
  [actions.SIGNUP]: {
    category: categories.AUTH
  },

  // SEARCH

  [actions.FOCUS_SEARCH]: {
    category: categories.LISTS
  },
  [actions.ENTER_SEARCH_TERM]: {
    category: categories.LISTS
  },

  // LISTS

  [actions.CREATE_DOCUMENT]: {
    category: categories.LISTS
  },
  [actions.EDIT_DOCUMENT]: {
    category: categories.LISTS
  }
}

export const trackAction = (name, payload) => {
  const { category } = actionDetails[name]

  if (inDevelopment()) console.log(`analytics: ${category}.${name}`, payload)

  window.gtag('event', name, {
    event_category: category,
    event_label: JSON.stringify(payload)
  })
}
