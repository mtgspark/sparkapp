import { useState, useEffect } from 'react'
import firebase from 'firebase'

export default collectionName => {
  const [isLoading, setIsLoading] = useState(null)
  const [isErrored, setIsErrored] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const [results, setResults] = useState(null)

  const getData = async () => {
    if (!collectionName) {
      console.warn('Cannot database backup: no collection name provided')
      return
    }

    setIsLoading(true)
    setIsErrored(null)
    setIsSuccess(null)

    try {
      console.log('useDatabaseBackup.backup.start', collectionName)

      const result = await firebase
        .firestore()
        .collection(collectionName)
        .get()

      const resultDocs = result.docs.map(doc => ({ ...doc.data(), id: doc.id }))

      console.log(
        'useDatabaseBackup.backup.success',
        collectionName,
        resultDocs
      )

      setIsLoading(false)
      setIsErrored(false)
      setIsSuccess(true)
      setResults(resultDocs)
    } catch (err) {
      setIsErrored(true)
      setIsLoading(false)
      setIsSuccess(false)
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [collectionName])

  return [isLoading, isErrored, isSuccess, results]
}
