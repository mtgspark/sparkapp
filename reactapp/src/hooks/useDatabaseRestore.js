import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

const removeIdFromDocData = docData =>
  Object.entries(docData)
    .filter(([key]) => key !== 'id')
    .reduce(
      (newObj, [key, value]) => ({
        ...newObj,
        [key]: value
      }),
      {}
    )

export default (collectionName, restoreDataJson) => {
  const [isLoading, setIsLoading] = useState(null)
  const [isErrored, setIsErrored] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const [results, setResults] = useState(null)

  const getData = async () => {
    if (!collectionName || !restoreDataJson) {
      console.warn(
        'Cannot database restore: no collection name or data provided!'
      )
      return
    }

    setIsLoading(true)
    setIsErrored(null)
    setIsSuccess(null)

    try {
      const restoreData = JSON.parse(restoreDataJson)

      await Promise.all(
        restoreData.map(async docData => {
          await firebase
            .firestore()
            .collection(collectionName)
            .doc(docData.id)
            .set(removeIdFromDocData(docData), { merge: true })
        })
      )

      setIsLoading(false)
      setIsErrored(false)
      setIsSuccess(true)
      setResults(null)
    } catch (err) {
      setIsErrored(true)
      setIsLoading(false)
      setIsSuccess(false)
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [collectionName]) // do not subscribe to restoreData to avoid re-restores

  return [isLoading, isErrored, isSuccess, results]
}
