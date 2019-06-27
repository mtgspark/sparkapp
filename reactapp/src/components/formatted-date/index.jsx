import React from 'react'
import moment from 'moment'

const FormattedDate = ({ date, isRelative = true }) => (
  <>{isRelative ? moment(date).fromNow() : moment(date).toString()}</>
)

export default FormattedDate
