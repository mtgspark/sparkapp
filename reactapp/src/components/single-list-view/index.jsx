import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDatabase from '../../hooks/useDatabase'
import { Button } from '@material-ui/core'

const CardRow = ({ scryfallId, ranking }) => {
  const [scryfallData, setScryfallData] = useState({ image_uris: {} })

  const fetchFromScryfall = async () => {
    const url = `https://api.scryfall.com/cards/${scryfallId}?format=json&pretty=true`

    const response = await fetch(url)
    const json = await response.json()

    setScryfallData(json)
  }

  useEffect(() => {
    fetchFromScryfall()
  })

  return (
    <li>
      <b>#{ranking}</b>
      <figure className="card-wrapper text-center" align="center">
        <img src={scryfallData.image_uris.small} alt="mtg card" />
      </figure>
      <i>{scryfallData.flavor_text}</i>
    </li>
  )
}

const SingleListView = ({ listId }) => {
  const [isLoading, isErrored, result] = useDatabase('lists', listId)

  if (isLoading) {
    return 'Loading...'
  }

  if (isErrored || result === null) {
    return 'Error!'
  }

  const { title, description, cards } = result

  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {cards.map((card, idx) => (
          <CardRow {...card} ranking={idx + 1} />
        ))}
      </ul>
      <Link to={`/lists/${listId}/edit`}>
        <Button>Edit List</Button>
      </Link>
    </>
  )
}

export default SingleListView
