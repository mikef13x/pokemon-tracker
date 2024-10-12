require('dotenv').config();
const eBay = require('ebay-node-api');

// Initialize eBay API instance with your App ID
const ebay = new eBay({
  clientID: process.env.EBAY_APP_ID,
  env: process.env.EBAY_ENV, // Can be 'SANDBOX' or 'PRODUCTION'
});

// Function to find items by keywords
ebay.findItemsByKeywords({
  keywords: 'laptop',
  limit: 10
}).then((data) => {
    console.log(data)
  const items = data[0].searchResult[0].item;
  if (items && items.length > 0) {
    items.forEach(item => {
      console.log(`Title: ${item.title}, Price: ${item.sellingStatus[0].currentPrice[0].__value__}`);
    });
  } else {
    console.log('No items found');
  }
}).catch((error) => {
  console.error('Error:', error);
});

