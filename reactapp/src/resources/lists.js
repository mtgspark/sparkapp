import { createResource } from 'redux-rest-resource'

const hostUrl = 'https://firebase.com/api'
const apiKey = 'todo'

export const { types, actions, rootReducer } = createResource({
  name: 'list',
  url: `${hostUrl}/lists/:id?apiKey=${apiKey}`
})
