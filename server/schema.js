const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql')

const db = require('./db')

// ##############################################
// Abstract some reusable methods

const getUserById = (id) => db.readUserById(id)

const getGroupById = (id) => db.readGroupById(id)

// ##############################################
// Define the types used by the schema

// What a user looks like
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
    // How to iterate over list and associate friends
    friends: {
      type: new GraphQLList(UserType),
      resolve: (user) => user.friends.map(getUserById)
    },
    // How to iterate over list and associate groups
    groups: {
      type: new GraphQLList(GroupType),
      resolve: (user) => user.groups.map(getGroupById)
    }
  })
})

// What a group looks like
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

// ##############################################
// Define the query type, i.e. how the other types
// can be / are queried against

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'User Query',
  fields: () => ({
    // Get list of users
    users: {
      type: new GraphQLList(UserType),
      resolve: db.readAllUsers
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
      resolve: db.readAllGroups
    },
    // Get single group
    group: {
      type: GroupType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) => getGroupById(args.id)
    }
  })
})

// ##############################################
// Export the schema with the query defined

module.exports = new GraphQLSchema({
  query: QueryType
})
