// Just a fake database to query...
const data = {
  users: [
    {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'jdoe@email.com',
      friends: [ '2', '3' ],
      groups: [ '1' ]
    },
    {
      id: '2',
      first_name: 'Mary',
      last_name: 'Smith',
      email: 'msmith@email.com',
      friends: [ '1' ],
      groups: [ '1', '2' ]
    },
    {
      id: '3',
      first_name: 'Bill',
      last_name: 'Johnson',
      email: 'bjohnson@email.com',
      friends: [ '1', '2' ],
      groups: [ '2' ]
    }
  ],
  groups: [
    {
      id: '1',
      name: 'admins'
    },
    {
      id: '2',
      name: 'users'
    }
  ]
}

module.exports = {
  // User methods
  readAllUsers: () => Promise.resolve(data.users),
  readUserById: (id) => Promise.resolve(data.users.filter((item) => id.toString() === item.id)[0]),
  // Group methods
  readAllGroups: () => Promise.resolve(data.groups),
  readGroupById: (id) => Promise.resolve(data.groups.filter((item) => id.toString() === item.id)[0])
}