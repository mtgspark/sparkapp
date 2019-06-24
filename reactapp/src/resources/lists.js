export const fieldTypes = {
  string: 'string',
  date: 'date',
  array: 'array',
  multiline: 'multiline',
  object: 'object',
  number: 'number'
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
    arrayOf: [
      fieldTypes.object,
      {
        scryfallCardId: fieldTypes.string,
        cardName: fieldTypes.string,
        imageUrl: fieldTypes.string,
        ranking: fieldTypes.number,
        reason: fieldTypes.string
      }
    ],
    isEditable: true,
    label: 'Cards',
    isRequired: true,
    initialValue: []
  },
  keywords: {
    name: 'keywords',
    type: fieldTypes.array,
    arrayOf: fieldTypes.string,
    initialValue: [],
    helpText:
      'Enter in a keyword that is used for searching. eg. "time" and "warp" for Time Warp'
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
    initialValue: [],
    helpText: 'Click on a label to add it to your list'
  },
  createdAt: {
    name: 'createdAt',
    type: fieldTypes.date,
    isEditable: false
  },
  modifiedAt: {
    name: 'modifiedAt',
    type: fieldTypes.date,
    isEditable: false
  },
  createdBy: {
    name: 'createdBy',
    type: fieldTypes.string,
    isEditable: false
  },
  modifiedBy: {
    name: 'modifiedBy',
    type: fieldTypes.string,
    isEditable: false
  }
}

export const editableFields = Object.entries(allFields)
  .filter(([name, { isEditable }]) => isEditable)
  .reduce((newFields, [name, value]) => ({ ...newFields, [name]: value }), {})
