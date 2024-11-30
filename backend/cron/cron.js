const cron = require('node-cron');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const fetchPrices = require('../seed/price-data/fetchPrices');
const Card = require('../models/card');
const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/PokeTrack';

cron.schedule('*/5 * * * *', async () => {  // Run at midnight every day
  console.log('Running scheduled task');

  try {
    await mongoose.connect(dbUri);

    // Fetch the latest prices
    await fetchPrices();

    const priceGuidePath = path.join(
      __dirname,
      '../seed/price-data/price-guide.json'
    );
    const priceGuideData = JSON.parse(fs.readFileSync(priceGuidePath, 'utf-8'));

    const parsePrice = (price) => {
      if (!price || typeof price !== 'string') return null;
      const parsed = parseFloat(price.replace('$', '').replace(',', ''));
      return isNaN(parsed) ? null : parsed;
    };

    // Iterate over all cards
    const cards = await Card.find({});
    for (const card of cards) {
      const priceData = priceGuideData.find(
        (price) => price.setId === card.cardId
      );

      if (!priceData) {
        console.log(`No price data found for cardId: ${card.cardId}`);
        continue;
      }

      // Parse and save daily prices
      const dailyPrices = {
        grade7: parsePrice(priceData['cib-price']),
        grade8: parsePrice(priceData['new-price']),
        grade9: parsePrice(priceData['graded-price']),
        bgs95: parsePrice(priceData['box-only-price']),
        psa10: parsePrice(priceData['manual-only-price']),
        bgs10: parsePrice(priceData['bgs-10-price']),
        cgc10: parsePrice(priceData['condition-17-price']),
        raw: parsePrice(priceData['loose-price']),
      };

      card.prices = dailyPrices;
      card.priceHistory.push({
        date: new Date(),
        ...dailyPrices,
      });

      // Delete old daily price data (older than 14 days)
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      card.priceHistory = card.priceHistory.filter(
        (entry) => entry.date > twoWeeksAgo
      );

      // Calculate and update monthly averages
      const monthlyData = card.priceHistory.reduce((acc, entry) => {
        const month = entry.date.toISOString().slice(0, 7);  // Format "YYYY-MM"
        if (!acc[month]) acc[month] = { count: 0, totals: {} };

        for (const key of Object.keys(entry)) {
          if (key !== 'date') {
            acc[month].totals[key] = (acc[month].totals[key] || 0) + entry[key];
          }
        }
        acc[month].count += 1;
        return acc;
      }, {});

      const monthlyAverages = Object.keys(monthlyData).map((month) => {
        const data = monthlyData[month];
        const averages = {};

        for (const key of Object.keys(data.totals)) {
          averages[key + 'Avg'] = data.totals[key] / data.count;
        }

        return { month, ...averages };
      });

      card.monthlyAverages = monthlyAverages;

      // Save the updated card document
      await card.save();

    }

    console.log('Card prices updated');
  } catch (error) {
    console.error('Error processing cron job', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
});

console.log('Cron job scheduled');
