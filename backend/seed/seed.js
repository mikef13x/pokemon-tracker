// FILE: seed.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Card = require('../models/card');
const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/PokeTrack';

async function seedDatabase() {
  try {
    await mongoose.connect(dbUri);

    await Card.collection.drop();
    console.log('Card collection dropped');

    let filePath = path.join(__dirname, '/filteredSetsData.json');
    console.log(`Reading file from: ${filePath}`);
    let jsonData = fs.readFileSync(filePath, 'utf-8');
    let cards = JSON.parse(jsonData);

    const addedCards = [];
    const skippedCards = [];

    for (const card of cards) {
      try {
        const existingCard = await Card.findOne({ cardId: card.id });
        if (existingCard) {
          skippedCards.push(card);
          continue;
        }

        const newCard = new Card({
          name: card.name,
          image: card.images.large,
          cardId: card.id,
          cardType: card.cardType,
          pokemonType: card.pokemonType,
          subType: card.subType,
          artist: card.artist,
          setId: card.setId,
          setName: card.setName,
          releaseDate: card.releaseDate,
          rarity: card.rarity,
          price: card.price,
        });
        await newCard.save();
        addedCards.push(newCard);
      } catch (error) {
        console.error(`Error saving cardId: ${card.id}`, error);
        throw error;
      }
    }

    console.log(`Added ${addedCards.length} cards`);
    console.log(`Skipped ${skippedCards.length} cards`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database', error);
    mongoose.connection.close();
  }
}

seedDatabase();