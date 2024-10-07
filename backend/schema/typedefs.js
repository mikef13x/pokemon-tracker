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
    id: ID!
    username: String!
    email: String!
    password: String!
}

type Pokemon {
  id: ID!
  name: String!
  type: String!
}

type Query {
  getPokemon(id: ID!): Pokemon
}

type Mutation {
  addPokemon(name: String!, type: String!): Pokemon
}
`;

module.exports = typeDefs;
