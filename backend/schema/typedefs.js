const typeDefs = `
type Query {
  getPokemon(id: ID!): Pokemon
}

type Mutation {
  addPokemon(name: String!, type: String!): Pokemon
}

type Pokemon {
  id: ID!
  name: String!
  type: String!
}
`;

module.exports = typeDefs;
