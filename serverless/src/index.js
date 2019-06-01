import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as firebaseHelper from 'firebase-functions-helper'
import express from 'express'
import * as bodyParser from 'body-parser'

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const app = express()
const main = express()

main.use('/api/v1', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false }))

app.get('/lists', (req, res) => {
  firebaseHelper.firestore
      .backup(db, 'lists')
      .then(({ lists }) => res.status(200).send({
        results: Object.entries(lists).map(([id, list]) => ({ ...list, id }))
      }))
      .catch(err => res.status(500).send({
        error: err.message
      }))
})

app.get('/lists/:listId', (req, res) => {
  firebaseHelper.firestore
      .getDocument(db, 'lists', req.params.listId)
      .then(doc => res.status(200).send(doc))
      .catch(err => res.status(500).send({
        error: err.message
      }))
})

export const webApi = functions.https.onRequest(main)