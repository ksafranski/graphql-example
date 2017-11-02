// Just a fake database to query...
const data = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'jdoe@email.com',
    friends: [ '2', '3' ]
  },
  {
    id: '2',
    first_name: 'Mary',
    last_name: 'Smith',
    email: 'msmith@email.com',
    friends: [ '1' ]
  },
  {
    id: '3',
    first_name: 'Bill',
    last_name: 'Johnson',
    email: 'bjohnson@email.com',
    friends: [ '1', '2' ]
  }
]

module.exports = {
  readAll: () => Promise.resolve(data),
  readById: (id) => Promise.resolve(data.filter((item) => id.toString() === item.id)[0])
}