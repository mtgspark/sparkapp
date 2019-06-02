export const fieldTypes = {
  string: 'string',
  date: 'date'
}

export const allFields = {
  id: {
    name: 'id',
    type: fieldTypes.string
  },
  title: {
    name: 'title',
    type: fieldTypes.string
  },
  description: {
    name: 'description',
    type: fieldTypes.string
  }
}

export const editableFields = Object.entries(allFields)
  .filter(([name]) => ['title', 'description'].includes(name))
  .reduce((newFields, [name, value]) => ({ ...newFields, [name]: value }), {})
