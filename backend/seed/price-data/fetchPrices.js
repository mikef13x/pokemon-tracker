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
const setIdsFilePath = path.join(__dirname, '../priceChartSetId.json');

// Load setIds.json
console.log('Loading setIds.json...');
const setIds = JSON.parse(fs.readFileSync(setIdsFilePath, 'utf8'));

// Fetch the CSV file and save it
console.log('Fetching CSV file...');
axios
  .get(csvUrl, { responseType: 'stream' })
  .then((response) => {
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
          const filteredJsonObj = jsonObj.filter((item) => !item['console-name'].includes('Pokemon Japanese'));

          // Remove the word "Pokemon" from the remaining console-name fields and change the key to setName
          const updatedJsonObj = filteredJsonObj.map((item) => {
            item['setName'] = item['console-name'].replace('Pokemon', '').trim();
            delete item['console-name'];

            // Separate product-name into name and setNumber
            const [name, setNumber] = item['product-name'].split(' #');
            item['name'] = name.trim();
            item['setNumber'] = setNumber ? setNumber.trim().toUpperCase() : '';
            delete item['product-name'];

            // Remove leading zero from setNumber if it starts with a zero
            item['setNumber'] = item['setNumber'].replace(/^0+/, '');

            // Special handling for "Promo" setName
            if (item['setName'] === 'Promo') {
              const firstLettersMatch = item['setNumber'].match(/^[A-Z]+/);
              let setPrefix;
              if (firstLettersMatch) {
                const firstLetters = firstLettersMatch[0].toLowerCase();
                setPrefix = `${firstLetters}p`;
              }
              if (item['setNumber'].includes('HGSS')) {
                setPrefix = 'hsp';
              }
              if ((/^\d+$/.test(item['setNumber']) && item['release-date'] === '2003-10-01') || item['release-date'] === '2005-11-01' || item['release-date'] === '2006-09-01' || item['name'] === 'Pikachu [Holo]') {
                setPrefix = 'np';
              }

              if ((/^\d+$/.test(item['setNumber']) && item['release-date'] === '1999-07-01') || ['121772', '88066', '87395', '87416', '87417', '88068', '88069', '85111', '87397', '83648'].includes(item['tcg-id'])) {
                setPrefix = 'basep';
              }

              // Set setName to "Pokémon Futsal Collection" if name contains "on the Ball"
            

              // Compare setPrefix to setIds keys and set the value as the item setName
              const setIdKey = Object.keys(setIds).find((key) => key === setPrefix);
              if (item['name'].includes('on the Ball')) {
                item['setName'] = 'Pokémon Futsal Collection';
              } else if (setIdKey) {
                item['setName'] = setIds[setIdKey];
              }
            }

            // Add setId if setName matches a value in setIds
            const setIdKey = Object.keys(setIds).find((key) => setIds[key] === item['setName']);
            if (setIdKey) {
              let prefix = '';
              if (item['setNumber'].startsWith('TG')) {
                prefix = 'tg';
              } else if (item['setNumber'].startsWith('GG')) {
                prefix = 'gg';
              } else if (item['setNumber'].startsWith('SV')) {
                prefix = 'sv';
              }
              item['setId'] = `${setIdKey}${prefix ? prefix : ''}-${item['setNumber']}`;
            }

            // Special handling for setNumber starting with "SV"
            if (item['setNumber'].startsWith('SV') && item['setName'] === 'Hidden Fates') {
              item['setId'] = `sma-${item['setNumber']}`;
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
  .catch((error) => {
    console.error('Error fetching CSV file:', error);
  });
