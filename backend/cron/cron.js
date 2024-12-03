const cron = require('node-cron');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const fetchPrices = require('../seed/price-data/fetchPrices');
const Card = require('../models/card');
const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/PokeTrack';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

cron.schedule('*/2 * * * *', async () => {
  try {
    // Fetch prices
    await fetchPrices();

    // Read the fetched prices from the JSON file
    const prices = JSON.parse(fs.readFileSync(path.join(__dirname, '../seed/price-data/price-guide.json'), 'utf8'));

    for (const priceData of prices) {
      const card = await Card.findOne({ cardId: priceData.setId });

      if (card) {
        // Helper function to convert price strings to numbers
        const convertPrice = (price) => parseFloat(price.replace(/[^0-9.-]+/g, ""));

        // Update card prices
        card.prices = {
          grade7: convertPrice(priceData['cib-price']),
          grade8: convertPrice(priceData['new-price']),
          grade9: convertPrice(priceData['graded-price']),
          bgs95: convertPrice(priceData['box-only-price']),
          psa10: convertPrice(priceData['manual-only-price']),
          bgs10: convertPrice(priceData['bgs-10-price']),
          cgc10: convertPrice(priceData['condition-17-price']),
          raw: convertPrice(priceData['loose-price']),
        };

        // Add to price history
        card.priceHistory.push({
          date: new Date(),
          grade7: convertPrice(priceData['cib-price']),
          grade8: convertPrice(priceData['new-price']),
          grade9: convertPrice(priceData['graded-price']),
          bgs95: convertPrice(priceData['box-only-price']),
          psa10: convertPrice(priceData['manual-only-price']),
          bgs10: convertPrice(priceData['bgs-10-price']),
          cgc10: convertPrice(priceData['condition-17-price']),
          raw: convertPrice(priceData['loose-price']),
        });

        console.log(`Updated price history for card: ${card.cardId}`);

        // Calculate weekly averages
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const weeklyPrices = card.priceHistory.filter(entry => entry.date >= oneWeekAgo);

        if (weeklyPrices.length > 0) {
          const weeklyAverages = {
            week: `${oneWeekAgo.toISOString().split('T')[0]} - ${new Date().toISOString().split('T')[0]}`,
            grade7Avg: weeklyPrices.reduce((sum, entry) => sum + entry.grade7, 0) / weeklyPrices.length,
            grade8Avg: weeklyPrices.reduce((sum, entry) => sum + entry.grade8, 0) / weeklyPrices.length,
            grade9Avg: weeklyPrices.reduce((sum, entry) => sum + entry.grade9, 0) / weeklyPrices.length,
            bgs95Avg: weeklyPrices.reduce((sum, entry) => sum + entry.bgs95, 0) / weeklyPrices.length,
            psa10Avg: weeklyPrices.reduce((sum, entry) => sum + entry.psa10, 0) / weeklyPrices.length,
            bgs10Avg: weeklyPrices.reduce((sum, entry) => sum + entry.bgs10, 0) / weeklyPrices.length,
            cgc10Avg: weeklyPrices.reduce((sum, entry) => sum + entry.cgc10, 0) / weeklyPrices.length,
            rawAvg: weeklyPrices.reduce((sum, entry) => sum + entry.raw, 0) / weeklyPrices.length,
          };

          card.weeklyAverages.push(weeklyAverages);
          console.log(`Updated weekly averages for card: ${card.cardId}`);
        }

        // Calculate monthly averages
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const monthlyPrices = card.weeklyAverages.filter(entry => new Date(entry.week.split(' - ')[1]) >= oneMonthAgo);

        if (monthlyPrices.length > 0) {
          const monthlyAverages = {
            month: `${oneMonthAgo.toISOString().split('T')[0]} - ${new Date().toISOString().split('T')[0]}`,
            grade7Avg: monthlyPrices.reduce((sum, entry) => sum + entry.grade7Avg, 0) / monthlyPrices.length,
            grade8Avg: monthlyPrices.reduce((sum, entry) => sum + entry.grade8Avg, 0) / monthlyPrices.length,
            grade9Avg: monthlyPrices.reduce((sum, entry) => sum + entry.grade9Avg, 0) / monthlyPrices.length,
            bgs95Avg: monthlyPrices.reduce((sum, entry) => sum + entry.bgs95Avg, 0) / monthlyPrices.length,
            psa10Avg: monthlyPrices.reduce((sum, entry) => sum + entry.psa10Avg, 0) / monthlyPrices.length,
            bgs10Avg: monthlyPrices.reduce((sum, entry) => sum + entry.bgs10Avg, 0) / monthlyPrices.length,
            cgc10Avg: monthlyPrices.reduce((sum, entry) => sum + entry.cgc10Avg, 0) / monthlyPrices.length,
            rawAvg: monthlyPrices.reduce((sum, entry) => sum + entry.rawAvg, 0) / monthlyPrices.length,
          };

          card.monthlyAverages.push(monthlyAverages);
          console.log(`Updated monthly averages for card: ${card.cardId}`);
        }

        // Delete old price histories
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        card.priceHistory = card.priceHistory.filter(entry => entry.date >= twoWeeksAgo);

        // Delete old weekly averages
        const fiveWeeksAgo = new Date();
        fiveWeeksAgo.setDate(fiveWeeksAgo.getDate() - 35);
        card.weeklyAverages = card.weeklyAverages.filter(entry => new Date(entry.week.split(' - ')[1]) >= fiveWeeksAgo);

        // Delete old monthly averages
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        card.monthlyAverages = card.monthlyAverages.filter(entry => new Date(entry.month.split(' - ')[1]) >= oneYearAgo);

        // Save the updated card
        await card.save();
        console.log(`Card saved: ${card.cardId}`);
      } else {
        console.log(`Card not found: ${priceData.cardId}`);
      }
    }

    console.log('Prices updated successfully');
  } catch (error) {
    console.error('Error updating prices:', error);
  }
});