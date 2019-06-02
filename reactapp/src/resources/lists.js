import { createResource } from 'redux-rest-resource'

const hostUrl = 'https://us-central1-sparkapp-b6fe3.cloudfunctions.net/webApi/api/v1'

export const { types, actions, rootReducer } = createResource({
  name: 'list',
  url: `${hostUrl}/lists/:id`
})
