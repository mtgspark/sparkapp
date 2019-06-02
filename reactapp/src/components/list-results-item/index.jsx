import React from 'react'

const ListsResultItem = ({ id, title, description, createdAt, modifiedAt, createdBy, modifiedBy }) => (
  <li>
    #{id} - {title}
  </li>
)

export default ListsResultItem
