const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const Card = require('../models/card');
const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/PokeTrack';

async function seedDatabase() {
  try {
    // Run fetchPrices.js script
    await new Promise((resolve, reject) => {
      exec('node fetchPrices.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing fetchPrices.js: ${error}`);
          reject(error);
        } else {
          console.log(`fetchPrices.js output: ${stdout}`);
          if (stderr) {
            console.error(`fetchPrices.js stderr: ${stderr}`);
          }
          resolve();
        }
      });
    });

    await mongoose.connect(dbUri);

    await Card.collection.drop();
    console.log('Card collection dropped');

    let filePath = path.join(__dirname, '/filteredSetsData.json');
    console.log(`Reading file from: ${filePath}`);
    let jsonData = fs.readFileSync(filePath, 'utf-8');
    let cards = JSON.parse(jsonData);

    // Load price-guide.json
    const priceGuidePath = path.join(__dirname, '/price-data/price-guide.json');
    const priceGuideData = JSON.parse(fs.readFileSync(priceGuidePath, 'utf-8'));

    const addedCards = [];
    const skippedCards = [];

    for (const card of cards) {
      try {
        const existingCard = await Card.findOne({ cardId: card.id });
        if (existingCard) {
          skippedCards.push(card);
          continue;
        }

        // Find matching price data
        const priceData = priceGuideData.find(price => price.name === card.name && price.setId === card.id);
       
        if (priceData) {
          console.log(`Found price data for card: ${card.name} (${card.id})`);
        } else {
          console.log(`No price data found for card: ${card.name} (${card.id})`);
        }

        const parsePrice = (price) => {
          if (!price || typeof price !== 'string') return null;
          const parsed = parseFloat(price.replace('$', '').replace(',', ''));
          return isNaN(parsed) ? null : parsed;
        };

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
          prices: priceData ? {
            psa7: parsePrice(priceData['cib-price']),
            psa8: parsePrice(priceData['new-price']),
            psa9: parsePrice(priceData['graded-price']),
            psa95: parsePrice(priceData['box-only-price']),
            psa10: parsePrice(priceData['manual-only-price']),
            raw: parsePrice(priceData['loose-price']),
          } : {},
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