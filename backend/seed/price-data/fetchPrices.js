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

const svpCardList = [
  "Sprigatito [Holo] 1",
  "Fuecoco 2",
  "Pawmot 6",
  "Espathra 10",
  "Hawlucha 7",
  "Miraidon 13",
  "Revavroom 8",
  "Spidops 9",
  "Arcanine 11",
  "Quaxly 3",
  "Quaquaval 5",
  "Mimikyu ex 4",
  "Koraidon 14",
  "Dondozo 12",
  "Flaaffy 15",
  "Lucario ex 17",
  "Ampharos ex 16",
  "Cyclizar ex 18",
  "Pelipper 22",
  "Baxcalibur 19",
  "Tinkaton 20",
  "Murkrow 21",
  "Smoliv 23",
  "Tinkatink 25",
  "Pikachu 27",
  "Koraidon ex 29",
  "Growlithe 24",
  "Varoom 26",
  "Miraidon ex 28",
  "Chien-Pao ex 30",
  "Tinkaton ex 31",
  "Annihilape ex 32",
  "Palafin 36",
  "Cleffa 37",
  "Togekiss 38",
  "Mawile 39",
  "Pawmi 40",
  "Paldean Wooper 41",
  "Houndstone 42",
  "Eevee 43",
  "Charmander 44",
  "Paradise Resort [Quarter Finalist] 45",
  "Meowscarada ex 33",
  "Skeledirge ex 34",
  "Bulbasaur 46",
  "Charmander 47",
  "Mewtwo 52",
  "Squirtle 48",
  "Mew ex 53",
  "Greninja ex 54",
  "Pikachu 101",
  "Quaquaval ex 35",
  "Alakazam ex 50",
  "Kangaskhan ex 55",
  "Zapdos ex 49",
  "Snorlax 51",
  "Chi-Yu 57",
  "Pineco 61",
  "Xatu 59",
  "Sinistea 62",
  "Charizard ex 56",
  "Iron Bundle 58",
  "Aegislash 60",
  "Cetitan 63",
  "Greavard 70",
  "Scream Tail 65",
  "Mimikyu 75",
  "Roaring Moon ex 67",
  "Arctibax 64",
  "Iron Valiant ex 68",
  "Iron Bundle 66",
  "Fidough 69",
  "Maschiff 71",
  "Pikachu with Grey Felt Hat 85",
  "Oddish 102",
  "Sprigatito 76",
  "Floragato 77",
  "Meowscarada ex 78",
  "Fuecoco 79",
  "Crocalor 80",
  "Skeledirge ex 81",
  "Quaxly 82",
  "Quaxwell 83",
  "Quaquaval ex 84",
  "Mabosstiff ex 86",
  "Miraidon EX [Jumbo]  ",
  "Pikachu 88",
  "Feraligatr 89",
  "Metang 90",
  "Koraidon 91",
  "Miraidon 92",
  "Cyclizar 96",
  "Cleffa 95",
  "Carvanha 93",
  "Bellibolt 94",
  "Flutter Mane 97",
  "Iron Thorns 98",
  "Iono 124",
  "Great Tusk ex 72",
  "Iron Treads ex 73",
  "Charizard ex 74",
  "Shroodle 99",
  "Grafaiai Ex 100",
  "Houndoom Ex 103",
  "Melmetal Ex 104",
  "Armarouge Ex 105",
  "Pikachu Ex 106",
  "Mareep 107",
  "Flaaffy 108",
  "Ampharos 109",
  "Darkrai Ex 110",
  "Pawniard 111",
  "Bisharp 112",
  "Kingambit 113",
  "Picnicker 114",
  "Thwackey 115",
  "Infernape 116",
  "Froslass 117",
  "Tatsugiri 118",
  "Toxel 119",
  "Pupitar 120",
  "Revavroom 121",
  "Snorlax 122",
  "Teal Mask Ogerpon 123",
  "Armarouge Ex 125",
  "Palafin Ex 126",
  "Walking Wake Ex 127",
  "Iron Leaves Ex 128",
  "Miraidon 148",
  "Kingambit 130",
  "Kingdra Ex 131",
  "Greninja Ex 132",
  "Pecharunt 129",
  "Drifblim 135",
  "Crabominable 134",
  "Bouffalant 136",
  "Ledian 133",
  "Horsea 137",
  "Latias 139",
  "Victini Ex 142",
  "Tinkaton 140",
  "Porygon2 138",
  "Noctowl 141",
  "Miraidon Ex 143",
  "Gouging Fire Ex 144",
  "Raging Bolt Ex 145",
  "Iron Crown Ex 146",
  "Iron Boulder Ex 147",
  "Pecharunt 149",
  "Paradise Resort 150"
]

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

              if ((/^\d+$/.test(item['setNumber']) && svpCardList.includes(`${item['name']} ${item['setNumber']}`) )) {
                setPrefix = 'svp';
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
