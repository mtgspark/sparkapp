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
    isRequired: true,
    defaultValue: ''
  },
  description: {
    name: 'description',
    type: fieldTypes.multiline,
    isEditable: true,
    label: 'Description',
    isRequired: true,
    defaultValue: ''
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
    defaultValue: []
  },
  keywords: {
    name: 'keywords',
    label: 'Keywords',
    type: fieldTypes.array,
    arrayOf: fieldTypes.string,
    defaultValue: [],
    helpText:
      'Enter in keywords that are used for searching. eg. "time" and "warp" for Time Warp',
    isEditable: true
  },
  labels: {
    name: 'labels',
    type: fieldTypes.array,
    arrayOf: fieldTypes.string,
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
    defaultValue: [],
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
    isEditable: false,
    defaultValue: null
  },
  createdBy: {
    name: 'createdBy',
    type: fieldTypes.string,
    isEditable: false
  },
  modifiedBy: {
    name: 'modifiedBy',
    type: fieldTypes.string,
    isEditable: false,
    defaultValue: null
  }
}

export const editableFields = Object.entries(allFields)
  .filter(([name, { isEditable }]) => isEditable)
  .reduce((newFields, [name, value]) => ({ ...newFields, [name]: value }), {})

export const nonEditableFields = Object.entries(allFields)
  .filter(([name, { isEditable }]) => !isEditable)
  .reduce((newFields, [name, value]) => ({ ...newFields, [name]: value }), {})
