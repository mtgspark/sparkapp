import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

export default (collectionName, documentId = null, searchClauses = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState(false)
  const [results, setResults] = useState(documentId ? null : [])

  const getData = async () => {
    setIsLoading(true)

    try {
      const collection = await firebase.firestore().collection(collectionName).get()

      setIsLoading(false)

      const docs = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))

      setResults(docs)

      // todo: narrow deeper with doc id or search clause
    } catch (err) {
      setIsErrored(true)
      setIsLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [collectionName, documentId])

  return [isLoading, isErrored, results]
}
