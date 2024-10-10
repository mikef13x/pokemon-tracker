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
        const oneCollection = await Collection.findById(collectionId);
        return oneCollection;
      } catch (error) {
        console.error('error getting collection', error);
        throw new Error('failed to get collection')
      }
    },

    getUserCollections: async (_, { userId }) => {
      try {
        const userCollections = await Collection.find({ userId: userId });
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
        });
        return userCollections;
      } catch (error) {
        console.error('error getting user main collection', error);
        throw new Error('Failed to get user main collection');
      }
    },

    getCards: async () => {
      try{
        const allCards = await Card.find();
        return allCards;
      } catch (error) {
        console.error("Error fetching cards", error);
        throw new Error('Failed to fetch cards')
      }
    },

    getCard: async (_, { _id }) => {
      try {
        const oneCard = await Card.findById(_id);
        return oneCard;
      } catch (error) {
        console.error('error getting card', error);
        throw new Error('Failed to get card');
      }
    }
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
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
      );
      return updatedUser;
    },

    addCard: async (_, { name, image, cardId, setId }) => {
      try {
        const newCard = new Card({
          name,
          image,
          cardId,
          setId,
        });
        await newCard.save();
        return newCard;
      } catch (error) {
        console.error('error adding card', error);
        throw new Error('Failed to add card');
      }
    },

    createCollection: async (_, {userId, collectionName}) => {
      try{ 
        const newCollection = new Collection({
          userId,
          collectionName,
        });

        await newCollection.save();
        console.log("new collection created")
        return newCollection
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
        );
        return updatedCollection;
      } catch (error) {
        console.error('error updating collection', error);
        throw new Error('Failed to update collection');
      }
    },
  },
};

module.exports = resolvers;
