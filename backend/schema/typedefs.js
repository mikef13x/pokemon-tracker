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

type Price {
  grade7: Float
  grade8: Float
  grade9: Float
  grade95: Float
  psa10: Float
  bgs10: Float
  cgc10: Float
  raw: Float
}

type Card {
  _id: ID!
  name: String!
  image: String!
  cardId: String!
  cardType: String!
  pokemonType: [String]
  subType: [String]
  artist: String
  setId: String!
  setName: String
  releaseDate: String
  prices: Price
  rarity: String
}

input CardFiltersInput {
  setId: [ID]
  setName: [String]
  releaseDate: [String]
  cardType: [String]
  pokemonType: [String]
  subType: [String]
  artist: [String]
  rarity: [String]
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
  getCardsBySet(setId: String!, filters: CardFiltersInput): [Card]
  getCardsByName(name: String!, filters: CardFiltersInput): [Card]
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(username: String!, password: String!): Auth
  removeUser(userId: ID!): User
  updateUser(userId: ID!, updateData: UpdateUserInput!): User
  addCard(name: String!, image: String!, cardId: String!, setId: String!, setName: String, releaseDate: String, cardType: String, pokemonType: [String], subType: [String], artist: String, prices: [PriceInput], rarity: String): Card
  createCollection(userId: ID!, collectionName: String!): Collection
  updateCollection(collectionId: ID!, updateData: UpdateCollectionInput!): Collection
  deleteCollection(collectionId: ID!): Collection
  addSetToCollection(collectionId: ID!, setId: ID!): Collection
}

input PriceInput {
  psa7: Float
  psa8: Float
  psa9: Float
  psa95: Float
  psa10: Float
  raw: Float
}
`;

module.exports = typeDefs;
