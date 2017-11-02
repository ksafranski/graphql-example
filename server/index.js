const express = require('express')
const bodyParser = require('body-parser')
const graphQLHTTP = require('express-graphql')
const app = express()
const schema = require('./schema')

// ##############################################
// Statics and setup

const PORT = process.env.PORT || 8080

// Use application/json body parser
app.use(bodyParser.json())

// ##############################################
// Use GraphQL

app.use(graphQLHTTP({
  schema,
  graphiql: true
}))


// ##############################################
// Listening...

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})