export const fieldTypes = {
  string: 'string',
  date: 'date',
  array: 'array',
  multiline: 'multiline'
}

export const allFields = {
  id: {
    name: 'id',
    type: fieldTypes.string
  },
  title: {
    name: 'title',
    type: fieldTypes.string,
    isEditable: true,
    label: 'Title',
    isRequired: true
  },
  description: {
    name: 'description',
    type: fieldTypes.multiline,
    isEditable: true,
    label: 'Description',
    isRequired: true
  },
  cards: {
    name: 'cards',
    type: fieldTypes.array,
    arrayOf: {
      cardId: fieldTypes.string
    },
    isEditable: true,
    label: 'Cards',
    isRequired: true,
    initialValue: [
      {
        cardId: '123'
      }
    ]
  },
  keywords: {
    name: 'keywords',
    type: fieldTypes.array,
    arrayOf: fieldTypes.string,
    initialValue: []
  },
  labels: {
    name: 'labels',
    type: fieldTypes.checkboxes,
    options: [
      'edh', // todo: store in firestore
      'modern',
      'standard',
      'legacy',
      'vintage',
      'competitive',
      'casual'
    ],
    isEditable: true,
    label: 'Labels',
    initialValue: []
  }
}

export const editableFields = Object.entries(allFields)
  .filter(([name, { isEditable }]) => isEditable)
  .reduce((newFields, [name, value]) => ({ ...newFields, [name]: value }), {})
