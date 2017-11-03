const express = require('express')
const bodyParser = require('body-parser')
const graphQLHTTP = require('express-graphql')
const app = express()
const schema = require('./schema')
const DataLoader = require('dataloader')

const db = require('./db')

// ##############################################
// Abstract some reusable methods

const getUserById = (id) => db.readUserById(id)

const getGroupById = (id) => db.readGroupById(id)

// ##############################################
// Statics and setup

const PORT = process.env.PORT || 8080

// Use application/json body parser
app.use(bodyParser.json())

// ##############################################
// Use GraphQL

app.use(graphQLHTTP((req) => {
  const userLoader = new DataLoader(
    keys => Promise.all(keys.map(getUserById))
  )
  const groupLoader = new DataLoader(
    keys => Promise.all(keys.map(getGroupById))
  )
  const loaders = {
    user: userLoader,
    group: groupLoader
  }
  return {
    context: { loaders },
    schema,
    graphiql: true
  }
}))


// ##############################################
// Listening...

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})