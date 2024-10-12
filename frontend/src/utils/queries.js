import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query getCollections {
    getCollections {
      _id
      collectionName
      userId
      cards
      isMain
    }
  }
`;

export const GET_COLLECTION = gql`
  query getCollection($collectionId: ID!) {
    getCollection(collectionId: $collectionId) {
      _id
      collectionName
      userId
      cards
      isMain
    }
  }
`;

export const GET_USER_COLLECTIONS = gql`
  query getUserCollections($userId: ID!) {
    getUserCollections(userId: $userId) {
      _id
      collectionName
      userId
      cards
      isMain
    }
  }
`;

export const GET_USER_MAIN_COLLECTION = gql`
  query getUserMainCollection($userId: ID!) {
    getUserMainCollection(userId: $userId) {
      _id
      collectionName
      userId
      cards
      isMain
    }
  }
`;

export const GET_CARDS = gql`
  query getCards {
    getCards {
      _id
      name
      image
      cardId
      setId
    }
  }
`;

export const GET_CARD = gql`
  query getCard($id: ID!) {
    getCard(_id: $id) {
      _id
      name
      image
      cardId
      setId
    }
  }
`;
