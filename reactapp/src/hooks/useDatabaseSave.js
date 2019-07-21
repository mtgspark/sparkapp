import { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { trackAction, actions } from '../analytics'
import store from '../store'

export default (collectionName, documentId = null) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)

  const save = async fields => {
    setIsSuccess(null)
    setIsSaving(true)

    try {
      const collection = firebase.firestore().collection(collectionName)

      if (documentId) {
        await collection.doc(documentId).set(fields, { merge: true })
      } else {
        await collection.add(fields)
      }

      setIsSuccess(true)
      setIsSaving(false)

      trackAction(
        documentId ? actions.EDIT_DOCUMENT : actions.CREATE_DOCUMENT,
        {
          userId: store.getState().firebase.auth.uid,
          collection: collectionName,
          ...(documentId
            ? {
                documentId
              }
            : {})
        }
      )
    } catch (err) {
      setIsSuccess(false)
      setIsSaving(false)
      console.error(err)
    }
  }

  return [isSaving, isSuccess, save]
}
