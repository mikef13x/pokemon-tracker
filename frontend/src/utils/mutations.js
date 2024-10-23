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
  mutation updateCollection($collectionId: ID!, $updateData: UpdateCollectionInput!) {
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
        price
      }
      isMain
    }
  }
`;