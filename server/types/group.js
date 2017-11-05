const {
  GraphQLObjectType: ObjectType,
  GraphQLString: String
} = require('graphql')

const Group = {
  GroupType: new ObjectType({
    name: 'Group',
    description: 'Group Type',
    fields: () => ({
      id: { type: String },
      name: { type: String }
    })
  })
}

module.exports = Group