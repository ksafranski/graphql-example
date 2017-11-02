# GraphQL Example

This project is a playground for my experiements in GraphQL.

The premise is fairly simple, an Express instance running [`express-graphql` middleware](https://www.npmjs.com/package/express-graphql), a [`schema`](./server/schema.js), and a [mock datasource](./server/db.js).

## Getting Started

* Run `yarn install` (preferred) or `npm install` to install all dependencies.
* Run `yarn run up` to start the service
* Access the `graphiql` interface at `http://localhost:8888/graphiql`

The queries available are `users` (list), `user`, `groups` (list) and `group`.

An example of a relational query:

```
{
	user(id: "1") {
    first_name,
    friends {
      first_name
    },
    groups {
      name
    }
  }
}
```

The above resolves relationships between both the (root) `user` and the `group` types.
