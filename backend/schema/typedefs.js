const typeDefs = `
type Auth {
    token: ID!
    user: User
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
}

input UpdateUserInput {
    username: String
    email: String
    password: String
}

type Collection {
  _id: ID!
  collectionName: String!
  userId: ID!
  cards: [Card]
  isMain: Boolean!
}

input UpdateCollectionInput {
  collectionName: String
  cards: [ID]
}

type Card {
  _id: ID!
  name: String!
  image: String!
  cardId: String!
  cardType: String!
  setId: String!
  setName: String
  releaseDate: String
  price: Float
}

type Query {
  getUsers: [User]
  getUser(userId: ID!): User
  getCollections: [Collection]
  getCollection(collectionId: ID!): Collection
  getUserCollections(userId: ID!): [Collection]
  getUserMainCollection(userId: ID!): Collection
  getCards: [Card]
  getCard(cardId: String!): Card
  getCardsBySet(setId: String!): [Card]
  getCardsByName(name: String!): [Card]
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(username: String!, password: String!): Auth
  removeUser(userId: ID!): User
  updateUser(userId: ID!, updateData: UpdateUserInput!): User
  addCard(name: String!, image: String!, cardId: String!, setId: String!, setName: String, releaseDate: String, cardType: String, price: String): Card
  createCollection(userId: ID!, collectionName: String!): Collection
  updateCollection(collectionId: ID!, updateData: UpdateCollectionInput!): Collection
  deleteCollection(collectionId: ID!): Collection
}
`;

module.exports = typeDefs;
