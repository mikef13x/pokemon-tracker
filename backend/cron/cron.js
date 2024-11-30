const cron = require('node-cron');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const fetchPrices = require('../seed/price-data/fetchPrices');
const Card = require('../models/card');
const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/PokeTrack';

const calculateWeeklyAverages = (priceHistory) => {
  const weeklyData = priceHistory.reduce((acc, entry) => {
    const weekStart = new Date(entry.date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of the week (Sunday)
    const week = weekStart.toISOString().slice(0, 10); // Format "YYYY-MM-DD"

    if (!acc[week]) acc[week] = { count: 0, totals: {} };

    // Sum the values for each entry in the week, excluding null values
    for (const key of Object.keys(entry)) {
      if (key !== 'date' && entry[key] !== null) {
        acc[week].totals[key] = (acc[week].totals[key] || 0) + entry[key];
      }
    }
    acc[week].count += 1;
    return acc;
  }, {});

  return Object.keys(weeklyData).map((week) => {
    const data = weeklyData[week];
    const averages = {};

    // Calculate average for each key (e.g., grade7Avg)
    for (const key of Object.keys(data.totals)) {
      averages[key + 'Avg'] = data.totals[key] / data.count;
    }

    return { week, ...averages };
  });
};

const calculateMonthlyAverages = (priceHistory) => {
  const monthlyData = priceHistory.reduce((acc, entry) => {
    const month = entry.date.toISOString().slice(0, 7); // Format "YYYY-MM"

    if (!acc[month]) acc[month] = { count: 0, totals: {} };

    // Sum the values for each entry in the month, excluding null values
    for (const key of Object.keys(entry)) {
      if (key !== 'date' && entry[key] !== null) {
        acc[month].totals[key] = (acc[month].totals[key] || 0) + entry[key];
      }
    }
    acc[month].count += 1;
    return acc;
  }, {});

  return Object.keys(monthlyData).map((month) => {
    const data = monthlyData[month];
    const averages = {};

    // Calculate average for each key (e.g., grade7Avg)
    for (const key of Object.keys(data.totals)) {
      averages[key + 'Avg'] = data.totals[key] / data.count;
    }

    return { month, ...averages };
  });
};

cron.schedule('*/10 * * * *', async () => {
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

      const priceHistoryEntry = {
        date: new Date(),
        ...dailyPrices,
      };

      card.priceHistory.push(priceHistoryEntry);

      // Calculate weekly and monthly averages
      card.weeklyAverages = calculateWeeklyAverages(card.priceHistory);
      card.monthlyAverages = calculateMonthlyAverages(card.priceHistory);

      // Save updated card document
      await card.save();
      console.log(`Updated card: ${card.cardId}`);
    }

  } catch (error) {
    console.error('Error during scheduled task:', error);
  } finally {
    mongoose.disconnect();
  }
});