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
  collectionName: String!
  userId: ID!
  cards: [ID!]
  isMain: Boolean!
}

input UpdateCollectionInput {
  collectionName: String!
  cards: [ID!]
}

type Card {
  _id: ID!
  name: String!
  image: String!
  cardId: String!
  setId: String!
}

type Query {
  getUsers: [User]
  getUser(userId: ID!): User
  getCollections: [Collection]
  getUserCollections(userId: ID!): [Collection]
  getUserMainCollection(userId: ID!): Collection
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(username: String!, password: String!): Auth
  addCard(name: String!, image: String!, cardId: String!, setId: String!): Card
  createCollection(userId: ID!, collectionName: String!): Collection
  updateCollection(collectionId: ID!, updateData: UpdateCollectionInput!): Collection
}
`;

module.exports = typeDefs;