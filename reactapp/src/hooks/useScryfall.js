import { useState, useEffect, useRef } from 'react'

const scryFallApiUrl = 'https://api.scryfall.com'
const cardByIdEndpoint = 'cards/'
const cardSearchEndpoint = 'cards/search?order=cmc&q='

const cardCacheById = {}
const cardCacheBySearchTerm = {}

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
  const timer = useRef()

  useEffect(() => {
    if (!scryfallCardId && !cardNameSearchTerm) {
      return
    }

    if (cardNameSearchTerm in cardCacheBySearchTerm) {
      console.log(`Card name ${cardNameSearchTerm} is in cache`)
      setResponseJson(cardCacheBySearchTerm[cardNameSearchTerm])
      return
    }

    if (scryfallCardId in cardCacheById) {
      console.log(`Card ID ${scryfallCardId} is in cache`)
      setResponseJson(cardCacheById[scryfallCardId])
      return
    }

    console.log(
      `Card ID ${scryfallCardId} or name ${cardNameSearchTerm} not in cache - fetching`
    )

    const doFetch = () => {
      const onDone = json => {
        const bestSearchResult = json.data[0]

        cardCacheById[bestSearchResult.id] = bestSearchResult
        if (cardNameSearchTerm) {
          cardCacheBySearchTerm[cardNameSearchTerm] = bestSearchResult
        }

        console.log('useScryfall.fetch.done', bestSearchResult.name)

        setResponseJson(bestSearchResult)
        setIsFetching(false)
        setIsErrored(false)
      }

      const onError = err => {
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
    }

    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => doFetch(), 500)
  }, [scryfallCardId, cardNameSearchTerm])

  return [isFetching, isErrored, responseJson]
}

export default useScryfall
