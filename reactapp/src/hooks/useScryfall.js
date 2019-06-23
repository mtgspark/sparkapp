import { useState, useEffect } from 'react'

const scryFallApiUrl = 'https://api.scryfall.com'
const cardByIdEndpoint = 'cards/'
const cardSearchEndpoint = 'cards/search?order=cmc&q='

const performFetch = url =>
  fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    return response.json()
  })

const fetchCardById = scryfallCardId =>
  performFetch(`${scryFallApiUrl}/${cardByIdEndpoint}/${scryfallCardId}`)
const fetchCardsBySearch = cardNameSearchTerm =>
  performFetch(`${scryFallApiUrl}/${cardSearchEndpoint}/${cardNameSearchTerm}`)

const useScryfall = (scryfallCardId = null, cardNameSearchTerm = '') => {
  const [responseJson, setResponseJson] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [isErrored, setIsErrored] = useState(false)

  useEffect(() => {
    if (!scryfallCardId && !cardNameSearchTerm) {
      return
    }

    if (isFetching) {
      console.warn(
        'Cannot fetch from scryfall API: already fetching (todo: better ratelimiter)'
      )
      return
    }

    console.log(`useScryfall ${scryfallCardId} ${cardNameSearchTerm}`)

    const onDone = json => {
      console.log('Scryfall api success', json)
      setResponseJson(json.data[0])
      setIsFetching(false)
      setIsErrored(false)
    }

    const onError = err => {
      console.error('Scryfall api error', err)
      setResponseJson({})
      setIsFetching(false)
      setIsErrored(true)
    }

    setIsFetching(true)

    scryfallCardId
      ? fetchCardById(scryfallCardId)
          .then(onDone)
          .catch(onError)
      : fetchCardsBySearch(cardNameSearchTerm)
          .then(onDone)
          .catch(onError)
  }, [scryfallCardId, cardNameSearchTerm])

  return [isFetching, isErrored, responseJson]
}

export default useScryfall
