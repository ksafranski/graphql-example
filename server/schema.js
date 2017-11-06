const { makeExecutableSchema } = require('graphql-tools')

const db = require('./db')

const typeDefs = `
  type User {
    id: String
    first_name: String!
    last_name: String!
    email: String!
    friends: [User!]
    groups: [Group!]
  }
  
  type Group {
    id: String
    name: String!
  }
  
  type Query {
    users: [User!]!
    user(id: String!): User
    groups: [Group!]!
    group(id: String!): Group
  }
`

const resolvers = {
  Query: {
    users: db.readAllUsers,
    user: (root, { id }, { loaders }) => loaders.user.load(id),
    groups: db.readAllGroups,
    group: (root, { id }, { loaders }) => loaders.group.load(id)
  },
  User: {
    groups: ({ groups }, args, { loaders }) => loaders.group.loadMany(groups),
    friends: ({ friends }, args, { loaders }) => loaders.user.loadMany(friends)
  }
}

module.exports = makeExecutableSchema({ typeDefs, resolvers })
