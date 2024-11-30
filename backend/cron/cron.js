const cron = require('node-cron');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const fetchPrices = require('../seed/price-data/fetchPrices');
const Card = require('../models/card');
const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/PokeTrack';

// Schedule a task to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running a task every day at midnight');
  
  try {
    await mongoose.connect(dbUri);

    await fetchPrices();

    // Load price-guide.json
    const priceGuidePath = path.join(__dirname, '../seed/price-data/price-guide.json');
    const priceGuideData = JSON.parse(fs.readFileSync(priceGuidePath, 'utf-8'));

    const parsePrice = (price) => {
      if (!price || typeof price !== 'string') return null;
      const parsed = parseFloat(price.replace('$', '').replace(',', ''));
      return isNaN(parsed) ? null : parsed;
    };

    const cards = await Card.find({});
    for (const card of cards) {
      const priceData = priceGuideData.find(price => price.setId === card.cardId);
      if (priceData) {
        card.prices = {
          grade7: parsePrice(priceData['cib-price']),
          grade8: parsePrice(priceData['new-price']),
          grade9: parsePrice(priceData['graded-price']),
          bgs95: parsePrice(priceData['box-only-price']),
          psa10: parsePrice(priceData['manual-only-price']),
          bgs10: parsePrice(priceData['bgs-10-price']),
          cgc10: parsePrice(priceData['condition-17-price']),
          raw: parsePrice(priceData['loose-price']),
        };
        await card.save();
      }
    }

    console.log('Card prices updated');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating card prices', error);
    mongoose.connection.close();
  }
});

console.log('Cron job scheduled');