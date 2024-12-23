import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $updateData: UpdateUserInput!) {
    updateUser(userId: $userId, updateData: $updateData) {
      _id
      username
      email
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard(
    $name: String!
    $image: String!
    $cardId: String!
    $setId: String!
  ) {
    addCard(name: $name, image: $image, cardId: $cardId, setId: $setId) {
      _id
      name
      image
      cardId
      setId
    }
  }
`;

export const CREATE_COLLECTION = gql`
  mutation createCollection($userId: ID!, $collectionName: String!) {
    createCollection(userId: $userId, collectionName: $collectionName) {
      _id
      collectionName
      userId
      cards
      isMain
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation updateCollection(
    $collectionId: ID!
    $updateData: UpdateCollectionInput!
  ) {
    updateCollection(collectionId: $collectionId, updateData: $updateData) {
      _id
      collectionName
      userId
      cards {
        _id
        name
        image
        cardId
        cardType
        setId
        setName
        releaseDate
        prices {
          grade7
          grade8
          grade9
          grade95
          psa10
          bgs10
          cgc10
          raw
        }
        priceHistory {
          date
          grade7
          grade8
          grade9
          grade95
          psa10
          bgs10
          cgc10
          raw
        }
        monthlyAverages {
          month
          grade7Avg
          grade8Avg
          grade9Avg
          grade95Avg
          psa10Avg
          bgs10Avg
          cgc10Avg
          rawAvg
        }
        weeklyAverages {
          week
          grade7Avg
          grade8Avg
          grade9Avg
          grade95Avg
          psa10Avg
          bgs10Avg
          cgc10Avg
          rawAvg
        }
      }
      isMain
    }
  }
`;

export const ADD_SET_TO_COLLECTION = gql`
  mutation Mutation($collectionId: ID!, $setId: ID!) {
    addSetToCollection(collectionId: $collectionId, setId: $setId) {
      _id
      collectionName
      userId
      cards {
        _id
        name
        image
        cardId
        cardType
        setId
        setName
        releaseDate
        prices {
          grade7
          grade8
          grade9
          grade95
          psa10
          bgs10
          cgc10
          raw
        }
        priceHistory {
          date
          grade7
          grade8
          grade9
          grade95
          psa10
          bgs10
          cgc10
          raw
        }
        monthlyAverages {
          month
          grade7Avg
          grade8Avg
          grade9Avg
          grade95Avg
          psa10Avg
          bgs10Avg
          cgc10Avg
          rawAvg
        }
        weeklyAverages {
          week
          grade7Avg
          grade8Avg
          grade9Avg
          grade95Avg
          psa10Avg
          bgs10Avg
          cgc10Avg
          rawAvg
        }
      }
      isMain
    }
  }
`;
