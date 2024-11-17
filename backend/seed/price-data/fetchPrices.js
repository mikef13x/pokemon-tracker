require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

console.log('fetchPrices.js script started'); // Initial log statement

// URL to fetch the CSV file
const csvUrl = `https://www.pricecharting.com/price-guide/download-custom?t=${process.env.PRICE_CHARTING_KEY}&category=pokemon-cards`;

// Paths to the files
const csvFilePath = path.join(__dirname, 'price-guide.csv');
const jsonFilePath = path.join(__dirname, 'price-guide.json');
const setIdsFilePath = path.join(__dirname, '../setIds.json');

// Load setIds.json
console.log('Loading setIds.json...');
const setIds = JSON.parse(fs.readFileSync(setIdsFilePath, 'utf8'));

// Fetch the CSV file and save it
console.log('Fetching CSV file...');
axios.get(csvUrl, { responseType: 'stream' })
  .then(response => {
    console.log('CSV file fetched, saving to file...');
    const writer = fs.createWriteStream(csvFilePath);
    response.data.pipe(writer);
    writer.on('finish', () => {
      console.log('CSV file has been downloaded and saved.');

      // Convert CSV to JSON
      console.log('Converting CSV to JSON...');
      csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
          console.log('CSV converted to JSON, processing data...');
          // Filter out entries containing "Pokemon Japanese" in the console-name field
          // and entries containing "[Reverse Holo]" in the name field
          const filteredJsonObj = jsonObj.filter(item => 
            !item['console-name'].includes('Pokemon Japanese')
          );

          // Remove the word "Pokemon" from the remaining console-name fields and change the key to setName
          const updatedJsonObj = filteredJsonObj.map(item => {
            item['setName'] = item['console-name'].replace('Pokemon', '').trim();
            delete item['console-name'];

            // Separate product-name into name and setNumber
            const [name, setNumber] = item['product-name'].split(' #');
            item['name'] = name.trim();
            item['setNumber'] = setNumber ? setNumber.trim() : '';
            delete item['product-name'];

            // Add setId if setName matches a value in setIds
            const setIdKey = Object.keys(setIds).find(key => setIds[key] === item['setName']);
            if (setIdKey) {
              item['setId'] = `${setIdKey}-${item['setNumber']}`;
            }

            return item;
          });

          // Write updated JSON to a new file
          console.log('Writing JSON to file...');
          fs.writeFileSync(jsonFilePath, JSON.stringify(updatedJsonObj, null, 2), 'utf8');
          console.log('CSV file has been converted to JSON and written to price-guide.json');
        })
        .catch((error) => {
          console.error('Error converting CSV to JSON:', error);
        });
    });
    writer.on('error', (error) => {
      console.error('Error writing CSV file:', error);
    });
  })
  .catch(error => {
    console.error('Error fetching CSV file:', error);
  });