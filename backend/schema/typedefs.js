const typeDefs = `
type Auth {
    token: ID!
    user: User
}

input UserInput {
    username: String
    email: String
    password: String
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
}

type Collection {
  _id: ID!
  userId: ID!
  cards: [Card]
}

type Card {
  _id: ID!
  name: String!
  image: String!
}

type Pokemon {
  _id: ID!
  name: String!
  type: String!
}

type Query {
  getPokemon(_id: ID!): Pokemon
  getUsers: [User]
  getUser(userId: ID!): User
}

type Mutation {
  CreateUser(username: String!, email: String!, password: String!): Auth
  login(username: String!, password: String!): Auth
  addPokemon(name: String!, type: String!): Pokemon
}
`;

module.exports = typeDefs;
