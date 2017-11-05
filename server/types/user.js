const {
  GraphQLObjectType: ObjectType,
  GraphQLString: String,
  GraphQLList: List
} = require('graphql')

const { GroupType } = require('./group')

const User = {
  UserType: new ObjectType({
    name: 'User',
    description: 'User Type',
    fields: () => ({
      id: { type: String },
      first_name: { type: String },
      last_name: { type: String },
      email: { type: String },
      // How to iterate over list and associate friends
      friends: {
        type: new List(User.UserType),
        resolve: (user, args, { loaders }) => loaders.user.loadMany(user.friends)
      },
      // How to iterate over list and associate groups
      groups: {
        type: new List(GroupType),
        resolve: (user, args, { loaders }) => loaders.group.loadMany(user.groups)
      }
    })
  })
}

module.exports = User