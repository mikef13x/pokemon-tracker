const cron = require('node-cron');
const fetchPrices = require('../seed/price-data/fetchPrices'); // Adjust the path as necessary

// Schedule a task to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running a task every day at midnight');
  await fetchPrices();
});

console.log('Cron job scheduled');