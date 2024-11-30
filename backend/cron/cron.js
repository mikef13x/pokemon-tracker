const cron = require('node-cron');
// const Card = require('./card'); // Adjust the path as necessary

// Schedule a task to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running a task every day at midnight');
  // Add your task logic here
});

console.log('Cron job scheduled');