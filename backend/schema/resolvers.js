const { User, Card, Collection } = require('../models');
const { GraphQLError } = require('graphql');

const { signToken } = require('../utils/auth');
const { createCollection } = require('../models/user');

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const allUsers = await User.find().select('-password');
        return allUsers;
      } catch (error) {
        console.error('error getting users', error);
        throw new Error('Failed to get users');
      }
    },
    getUser: async (_, { userId }) => {
      try {
        const oneUser = await User.findById(userId).select('-password');
        return oneUser;
      } catch (error) {
        console.error('error getting user', error);
        throw new Error('Failed to get user');
      }
    },

    getCollections: async () => {
      try {
        const allCollections = await Collection.find();
        return allCollections;
      } catch (error) {
        console.error('error getting collections', error);
        throw new Error('Failed to get collections');
      }
    },

    getCollection: async (_, { collectionId }) => {
      try {
        const oneCollection = await Collection.findById(collectionId).populate('cards');
        return oneCollection;
      } catch (error) {
        console.error('error getting collection', error);
        throw new Error('failed to get collection');
      }
    },

    getUserCollections: async (_, { userId }) => {
      try {
        const userCollections = await Collection.find({
          userId: userId,
        }).populate('cards');
        return userCollections;
      } catch (error) {
        console.error('error getting user collections', error);
        throw new Error('Failed to get user collections');
      }
    },

    getUserMainCollection: async (_, { userId }) => {
      try {
        const userCollections = await Collection.findOne({
          userId: userId,
          isMain: true,
        }).populate('cards');
        return userCollections;
      } catch (error) {
        console.error('error getting user main collection', error);
        throw new Error('Failed to get user main collection');
      }
    },

    getCards: async () => {
      try {
        const allCards = await Card.find();
        return allCards;
      } catch (error) {
        console.error('Error fetching cards', error);
        throw new Error('Failed to fetch cards');
      }
    },

    getCard: async (_, { cardId }) => {
      try {
        const oneCard = await Card.findOne({ cardId: cardId });
        return oneCard;
      } catch (error) {
        console.error('error getting card', error);
        throw new Error('Failed to get card');
      }
    },

    getCardsBySet: async (_, { setId, filters }) => {
      try {
        let searchCriteria = { setId: setId};

        if (filters) {
          if (filters.setId && Array.isArray(filters.setId)) {
            searchCriteria.setId = { $in: filters.setId };
          } else if (filters.setId) {
            searchCriteria.setId = filters.setId;
          }
          if (filters.setName && Array.isArray(filters.setName)) {
            searchCriteria.setName = { $in: filters.setName.map((name) => new RegExp(escapeRegExp(name), 'i')) };
          } else if (filters.setName) {
            searchCriteria.setName = new RegExp(escapeRegExp(filters.setName), 'i');
          }
          if (filters.releaseDate) {
            searchCriteria.releaseDate = filters.releaseDate;
          }
          if (filters.cardType && Array.isArray(filters.cardType)) {
            searchCriteria.cardType = { $in: filters.cardType };
          } else if (filters.cardType) {
            searchCriteria.cardType = filters.cardType;
          }
          if (filters.pokemonType && Array.isArray(filters.pokemonType)) {
            searchCriteria.pokemonType = { $in: filters.pokemonType };
          } else if (filters.pokemonType) {
            searchCriteria.pokemonType = filters.pokemonType;
          }
        }

        const setCards = await Card.find(searchCriteria);
        return setCards;
      } catch (error) {
        console.error('error getting cards by set', error);
        throw new Error('Failed to get cards by set');
      }
    },

    getCardsByName: async (_, { name, filters }) => {
      const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      };
    
      const isValidInput = (input) => {
        const whitelist = /^[a-zA-Z0-9\s\[\]\(\)]+$/;
        return whitelist.test(input);
      };
    
      try {
        if (!isValidInput(name)) {
          throw new Error('Invalid input');
        }
    
        const components = name.split(' ');
        let numberPart = '';
        const nameParts = [];
    
        components.forEach((component) => {
          if (!isNaN(component)) {
            numberPart = component;
          } else {
            nameParts.push(escapeRegExp(component));
          }
        });
    
        const nameRegex = new RegExp(nameParts.map((part) => `(?=.*${part})`).join(''), 'i');
        let searchCriteria = { name: nameRegex };
    
        if (numberPart) {
          searchCriteria.cardId = new RegExp(`-${escapeRegExp(numberPart)}$`, 'i');
        }
    
        // Apply additional filters if provided
        if (filters) {
          if (filters.setId && Array.isArray(filters.setId)) {
            searchCriteria.setId = { $in: filters.setId };
          } else if (filters.setId) {
            searchCriteria.setId = filters.setId;
          }
          
          if (filters.setName && Array.isArray(filters.setName)) {
            searchCriteria.setName = { $in: filters.setName.map((name) => new RegExp(escapeRegExp(name), 'i')) };
          } else if (filters.setName) {
            searchCriteria.setName = new RegExp(escapeRegExp(filters.setName), 'i');
          }
          if (filters.releaseDate) {
            searchCriteria.releaseDate = filters.releaseDate;
          }
          if (filters.cardType && Array.isArray(filters.cardType)) {
            searchCriteria.cardType = { $in: filters.cardType };
          } else if (filters.cardType) {
            searchCriteria.cardType = filters.cardType;
          }
          if (filters.pokemonType && Array.isArray(filters.pokemonType)) {
            searchCriteria.pokemonType = { $in: filters.pokemonType };
          } else if (filters.pokemonType) {
            searchCriteria.pokemonType = filters.pokemonType;
          }
        }
        console.log(searchCriteria)
    
        const cards = await Card.find(searchCriteria);
        return cards;
      } catch (error) {
        console.error('error getting cards by name', error);
        throw new Error('Failed to get cards by name');
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const newUser = await User.create({ username, email, password });
        const token = signToken(newUser);
        return { token, user: newUser };
      } catch (error) {
        console.error('Error creating user model:', error);
        throw new Error('Failed to create user model');
      }
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      const token = signToken(user);
      return { token, user };
    },

    removeUser: async (_, { userId }) => {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error('User not found.');
      }
      return deletedUser;
    },

    updateUser: async (_, { userId, updateData }) => {
      const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });
      return updatedUser;
    },

    addCard: async (_, { name, image, cardId, setId, price }) => {
      try {
        const newCard = new Card({
          name,
          image,
          cardId,
          setId,
          price,
        });
        await newCard.save();
        return newCard;
      } catch (error) {
        console.error('error adding card', error);
        throw new Error('Failed to add card');
      }
    },

    createCollection: async (_, { userId, collectionName }) => {
      try {
        const newCollection = new Collection({
          userId,
          collectionName,
        });

        await newCollection.save();
        console.log('new collection created');
        return newCollection;
      } catch (error) {
        console.error('error creating collectio', error);
        throw new Error('Failed to create collection');
      }
    },

    updateCollection: async (_, { collectionId, updateData }) => {
      try {
        const updatedCollection = await Collection.findByIdAndUpdate(
          collectionId,
          { $set: updateData },
          { new: true, runValidators: true }
        ).populate('cards'); 
    
        return updatedCollection;
      } catch (error) {
        console.error('error updating collection', error);
        throw new Error('Failed to update collection');
      }
    },

    deleteCollection: async (_, { collectionId }) => {
      const deletedCollection = await Collection.findByIdAndDelete(collectionId);
      if (!deletedCollection) {
        throw new Error('Collection not found.');
      }
      return deletedCollection;
    },
  },
};

module.exports = resolvers;
