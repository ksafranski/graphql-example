const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql')

const db = require('../db')

const getUserById = (id) => db.read(id)

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Type',
  fields: () => ({
    first_name: {
      type: GraphQLString
    },
    last_name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: (user) => user.friends.map(getUserById)
    }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'User Query',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) => getUserById(args.id)
    }
  })
})

const schema = new GraphQLSchema({
  query: QueryType
})


module.exports = schema