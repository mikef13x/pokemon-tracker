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

    // Load price-guide.json
    const priceGuidePath = path.join(__dirname, '/price-data/price-guide.json');
    const priceGuideData = JSON.parse(fs.readFileSync(priceGuidePath, 'utf-8'));

    const addedCards = [];
    const skippedCards = [];
    const noPriceDataCards = [];

    for (const card of cards) {
      try {
        const existingCard = await Card.findOne({ cardId: card.id });
        if (existingCard) {
          skippedCards.push(card);
          continue;
        }

        // Find matching price data
        const priceData = priceGuideData.find(price => price.setId === card.id);
       
        // if (priceData) {
        //   console.log(`Found price data for card: ${card.name} (${card.id})`);
        // } else {
        //   console.log(`No price data found for card: ${card.name} (${card.id})`);
        //   noPriceDataCards.push(card);
        // }

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
            grade7: parsePrice(priceData['cib-price']),
            grade8: parsePrice(priceData['new-price']),
            grade9: parsePrice(priceData['graded-price']),
            bgs95: parsePrice(priceData['box-only-price']),
            psa10: parsePrice(priceData['manual-only-price']),
            bgs10: parsePrice(priceData['bgs-10-price']),
            cgc10: parsePrice(priceData['condition-17-price']),
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

    // // Write no price data cards to a file
    // const noPriceDataFilePath = path.join(__dirname, 'no-price-data-cards.json');
    // fs.writeFileSync(noPriceDataFilePath, JSON.stringify(noPriceDataCards, null, 2));
    // console.log(`No price data cards saved to: ${noPriceDataFilePath}`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database', error);
    mongoose.connection.close();
  }
}

seedDatabase();