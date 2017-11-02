const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql')

const db = require('./db')

const getUserById = (id) => db.readUserById(id)

const getGroupById = (id) => db.readGroupById(id)

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Type',
  fields: () => ({
    id: {
      type: GraphQLString
    },
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

const GroupType = new GraphQLObjectType({
  name: 'Group',
  description: 'Group Type',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'User Query',
  fields: () => ({
    // Get list of users
    users: {
      type: new GraphQLList(UserType),
      resolve: () => db.readAllUsers()
    },
    // Get single user
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) => getUserById(args.id)
    },
    // Get list of groups
    groups: {
      type: new GraphQLList(GroupType),
      resolve: () => db.readAllGroups()
    },
    group: {
      type: GroupType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) => getGroupById(args.id)
    }
  })
})

const schema = new GraphQLSchema({
  query: QueryType
})


module.exports = schema