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
      cards {
        _id
      }
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
      isMain
      cards {
        _id
        name
        image
        cardId
        cardType
        releaseDate
        setId
        setName
        pokemonType
        subType
        rarity
        artist
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
    }
  }
`;

export const GET_USER_COLLECTIONS = gql`
  query getUserCollections($userId: ID!) {
    getUserCollections(userId: $userId) {
      _id
      collectionName
      userId
      isMain
      cards {
        _id
        name
        image
        cardId
        cardType
        releaseDate
        setId
        setName
        pokemonType
        subType
        rarity
        artist
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
    }
  }
`;

export const GET_USER_MAIN_COLLECTION = gql`
  query getUserMainCollection($userId: ID!) {
    getUserMainCollection(userId: $userId) {
      _id
      collectionName
      userId
      isMain
      cards {
        _id
        name
        image
        cardId
        cardType
        releaseDate
        setId
        setName
        pokemonType
        subType
        rarity
        artist
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
      cardType
      releaseDate
      setId
      setName
      pokemonType
      subType
      rarity
      artist
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
  }
`;

export const GET_CARD = gql`
  query getCard($cardId: String!) {
    getCard(cardId: $cardId) {
      _id
      name
      image
      cardId
      cardType
      releaseDate
      setId
      setName
      pokemonType
      subType
      rarity
      artist
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
  }
`;

export const GET_CARDS_BY_NAME = gql`
  query getCardsByName($name: String!, $filters: CardFiltersInput) {
    getCardsByName(name: $name, filters: $filters) {
      _id
      name
      image
      cardId
      cardType
      releaseDate
      setId
      setName
      pokemonType
      subType
      rarity
      artist
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
  }
`;

export const GET_CARDS_BY_SET = gql`
  query getCardsBySet($setId: String!, $filters: CardFiltersInput) {
    getCardsBySet(setId: $setId, filters: $filters) {
      _id
      name
      image
      cardId
      cardType
      releaseDate
      setId
      setName
      pokemonType
      subType
      rarity
      artist
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
  }
`;
