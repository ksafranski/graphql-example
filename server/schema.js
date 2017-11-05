const {
  GraphQLSchema: Schema,
  GraphQLObjectType: ObjectType,
  GraphQLString: String,
  GraphQLList: List
} = require('graphql')

const { UserType } = require('./types/user')
const { GroupType } = require('./types/group')

const db = require('./db')

// ##############################################
// Define the query type, i.e. how the other types
// can be / are queried against

const QueryType = new ObjectType({
  name: 'Query',
  description: 'User Query',
  fields: () => ({
    // Get list of users
    users: {
      type: new List(UserType),
      resolve: db.readAllUsers
    },
    // Get single user
    user: {
      type: UserType,
      args: {
        id: { type: String }
      },
      resolve: (root, args, { loaders }) => loaders.user.load(args.id)
    },
    // Get list of groups
    groups: {
      type: new List(GroupType),
      resolve: db.readAllGroups
    },
    // Get single group
    group: {
      type: GroupType,
      args: {
        id: { type: String }
      },
      resolve: (root, args, { loaders }) => loaders.group.load(args.id)
    }
  })
})

// ##############################################
// Export the schema with the query defined

module.exports = new Schema({
  query: QueryType
})
