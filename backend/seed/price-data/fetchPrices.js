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
  'Sprigatito [Holo] 1',
  'Fuecoco 2',
  'Pawmot 6',
  'Espathra 10',
  'Hawlucha 7',
  'Miraidon 13',
  'Revavroom 8',
  'Spidops 9',
  'Arcanine 11',
  'Quaxly 3',
  'Quaquaval 5',
  'Mimikyu ex 4',
  'Koraidon 14',
  'Dondozo 12',
  'Flaaffy 15',
  'Lucario ex 17',
  'Ampharos ex 16',
  'Cyclizar ex 18',
  'Pelipper 22',
  'Baxcalibur 19',
  'Tinkaton 20',
  'Murkrow 21',
  'Smoliv 23',
  'Tinkatink 25',
  'Pikachu [Paldea] 27',
  'Koraidon ex 29',
  'Growlithe 24',
  'Varoom 26',
  'Miraidon ex 28',
  'Chien-Pao ex 30',
  'Tinkaton ex 31',
  'Annihilape ex 32',
  'Palafin 36',
  'Cleffa 37',
  'Togekiss 38',
  'Mawile 39',
  'Pawmi 40',
  'Paldean Wooper 41',
  'Houndstone 42',
  'Eevee 43',
  'Charmander 44',
  'Paradise Resort [Quarter Finalist] 45',
  'Meowscarada ex 33',
  'Skeledirge ex 34',
  'Bulbasaur 46',
  'Charmander 47',
  'Mewtwo 52',
  'Squirtle 48',
  'Mew ex 53',
  'Greninja ex 54',
  'Pikachu 101',
  'Quaquaval ex 35',
  'Alakazam ex 50',
  'Kangaskhan ex 55',
  'Zapdos ex 49',
  'Snorlax 51',
  'Chi-Yu 57',
  'Pineco 61',
  'Xatu 59',
  'Sinistea 62',
  'Charizard ex 56',
  'Iron Bundle 58',
  'Aegislash 60',
  'Cetitan 63',
  'Greavard 70',
  'Scream Tail 65',
  'Mimikyu 75',
  'Roaring Moon ex 67',
  'Arctibax 64',
  'Iron Valiant ex 68',
  'Iron Bundle 66',
  'Fidough 69',
  'Maschiff 71',
  'Pikachu with Grey Felt Hat 85',
  'Oddish 102',
  'Sprigatito 76',
  'Floragato 77',
  'Meowscarada ex 78',
  'Fuecoco 79',
  'Crocalor 80',
  'Skeledirge ex 81',
  'Quaxly 82',
  'Quaxwell 83',
  'Quaquaval ex 84',
  'Mabosstiff ex 86',
  'Miraidon EX [Jumbo]  ',
  'Pikachu 88',
  'Feraligatr 89',
  'Metang 90',
  'Koraidon 91',
  'Miraidon 92',
  'Cyclizar 96',
  'Cleffa 95',
  'Carvanha 93',
  'Bellibolt 94',
  'Flutter Mane 97',
  'Iron Thorns 98',
  'Iono 124',
  'Great Tusk ex 72',
  'Iron Treads ex 73',
  'Charizard ex 74',
  'Shroodle 99',
  'Grafaiai Ex 100',
  'Houndoom Ex 103',
  'Melmetal Ex 104',
  'Armarouge Ex 105',
  'Pikachu Ex 106',
  'Mareep 107',
  'Flaaffy 108',
  'Ampharos 109',
  'Darkrai Ex 110',
  'Pawniard 111',
  'Bisharp 112',
  'Kingambit 113',
  'Picnicker 114',
  'Thwackey 115',
  'Infernape 116',
  'Froslass 117',
  'Tatsugiri 118',
  'Toxel 119',
  'Pupitar 120',
  'Revavroom 121',
  'Snorlax 122',
  'Teal Mask Ogerpon 123',
  'Armarouge Ex 125',
  'Palafin Ex 126',
  'Walking Wake Ex 127',
  'Iron Leaves Ex 128',
  'Miraidon 148',
  'Kingambit 130',
  'Kingdra Ex 131',
  'Greninja Ex 132',
  'Pecharunt 129',
  'Drifblim 135',
  'Crabominable 134',
  'Bouffalant 136',
  'Ledian 133',
  'Horsea 137',
  'Latias 139',
  'Victini Ex 142',
  'Tinkaton 140',
  'Porygon2 138',
  'Noctowl 141',
  'Miraidon Ex 143',
  'Gouging Fire Ex 144',
  'Raging Bolt Ex 145',
  'Iron Crown Ex 146',
  'Iron Boulder Ex 147',
  'Pecharunt 149',
  'Paradise Resort 150',
];

const needSuffix = [
  'Choice Band sm2-121',
  'Enhanced Hammer sm2-124',
  'Rescue Stretcher sm2-130',
  'Charmander sm3-18',
  'Acerola sm3-112',
  'Guzma sm3-115',
  'Kiawe sm3-116',
  'Ultra Ball sm35-68',
  'Zoroark-GX sm35-77',
  'Cynthia sm5-119',
  'Volkner sm5-135',
  'Beast Ring sm6-102',
  'Acro Bike sm7-123',
  'Tate & Liza sm7-148',
  'Fiery Flint sm75-60',
  'Electropower sm8-172',
  'Net Ball sm8-187',
  "Professor Elm's Lecture sm8-188",
  'Pokemon Communication sm9-152',
  'Pokegear 3.0 sm10-182',
  'Welder sm10-189',
];

const smEnergies = {
  'Grass Energy': '164',
  'Fire Energy': '165',
  'Water Energy': '166',
  'Lightning Energy': '167',
  'Psychic Energy': '168',
  'Fighting Energy': '169',
  'Darkness Energy': '170',
  'Metal Energy': '171',
  'Fairy Energy': '172',
};

const basicSVEnergies = {
  'Basic Water Energy': ['3', '11'],
  'Basic Grass Energy': ['1', '9'],
  'Basic Darkness Energy': ['7', '15'],
  'Basic Lightning Energy': ['4', '12'],
  'Basic Metal Energy': ['8', '16'],
  'Basic Fire Energy': ['2', '10'],
  'Basic Psychic Energy': ['5', '13'],
  'Basic Fighting Energy': ['6', '14'],
};

const celebrationsClassic = {
  Charizard: 'cel25c-4_A',
  Blastoise: 'cel25c-2_A',
  Venusaur: 'cel25c-15_A1',
  'Here Comes Team Rocket': 'cel25c-15_A2',
  'Claydol [Holo]': 'cel25c-15_A4',
  "Rocket's Zapdos": 'cel25c-15_A3',
  'Imposter Professor Oak': 'cel25c-73_A',
  'Dark Gyarados': 'cel25c-8_A',
  'Shining Magikarp': 'cel25c-66_A',
  'Pikachu Birthday': 'cel25c-24_A',
  Cleffa: 'cel25c-20_A',
  "Rocket's Admin.": 'cel25c-86_A',
  Umbreon: 'cel25c-17_A',
  'Mew EX': 'cel25c-88_A',
  'Gardevoir EX': 'cel25c-93_A',
  "Team Magma's Groudon": 'cel25c-9_A',
  'Luxray GL LV.X': 'cel25c-109_A',
  'Garchomp C LV.X': 'cel25c-145_A',
  Reshiram: 'cel25c-113_A',
  Zekrom: 'cel25c-114_A',
  'Mewtwo EX': 'cel25c-54_A',
  'Xerneas EX': 'cel25c-97_A',
  'Tapu Lele GX': 'cel25c-60_A',
  Donphan: 'cel25c-107_A',
  'M Rayquaza EX': 'cel25c-76_A',
};

const plusleMinunCards = {
  Beldum: ['tk2a-1'],
  Electrike: ['tk2a-2'],
  Grumpig: ['tk2a-3'],
  Meowth: ['tk2a-4'],
  Metang: ['tk2a-5'],
  Plusle: ['tk2a-6'],
  Spoink: ['tk2a-7'],
  'Energy Search': ['tk2a-8', 'tk2b-9'],
  Potion: ['tk2a-9', 'tk2b-10'],
  "Professor Cozmo's Discovery": ['tk2a-10'],
  'Lightning Energy': ['tk2a-11', 'tk2b-12'],
  'Psychic Energy': ['tk2a-12'],
  Arcanine: ['tk2b-1'],
  Charmander: ['tk2b-2'],
  Charmeleon: ['tk2b-3'],
  Growlithe: ['tk2b-4'],
  Mareep: ['tk2b-5'],
  Minun: ['tk2b-6'],
  Vulpix: ['tk2b-7'],
  "Celio's Network": ['tk2b-8'],
  'Fire Energy': ['tk2b-11'],
};

const latiosLatiasCards = {
  Bagon: ['tk1a-1'],
  Combusken: ['tk1a-2'],
  Delcatty: ['tk1a-3'],
  Latias: ['tk1a-4'],
  Numel: ['tk1a-5'],
  Skitty: ['tk1a-6'],
  Torchic: ['tk1a-7'],
  Potion: ['tk1a-8','tk1b-8'],
  'Energy Search': ['tk1a-9','tk1b-9'],
  'Fire Energy': ['tk1a-10'],
  Electrike: ['tk1b-1'],
  Latios: ['tk1b-2'],
  Linoone: ['tk1b-3'],
  Magnemite: ['tk1b-4'],
  Magneton: ['tk1b-5'],
  Pikachu: ['tk1b-6'],
  Zigzagoon: ['tk1b-7'],
  'Lightning Energy': ['tk1b-10'],
};

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
          const filteredJsonObj = jsonObj.filter(
            (item) => !item['console-name'].includes('Pokemon Japanese')
          );

          // Remove the word "Pokemon" from the remaining console-name fields and change the key to setName
          const updatedJsonObj = filteredJsonObj.map((item) => {
            item['setName'] = item['console-name']
              .replace('Pokemon', '')
              .trim();
            delete item['console-name'];

            // Separate product-name into name and setNumber
            let name, setNumber;
            if (
              item['product-name'].startsWith("Blaine's Quiz") &&
              item['product-name'] !== "Blaine's Quiz Show #186"
            ) {
              const parts = item['product-name'].split(' #');
              name = parts.slice(0, 2).join(' #');
              setNumber = parts.slice(2).join(' #');
            } else {
              [name, setNumber] = item['product-name'].split(' #');
            }
            item['name'] = name.trim();

            // Check if the name contains "Unown" and extract the letter in square brackets
            const unownMatch = item['name'].match(
              /Unown \[([A-Z]|Question Mark|Exclamation)\]/i
            );
            if (unownMatch) {
              if (unownMatch[1].toLowerCase() === 'question mark') {
                item['setNumber'] = '?';
              } else if (unownMatch[1].toLowerCase() === 'exclamation') {
                item['setNumber'] = '!';
              } else {
                item['setNumber'] = unownMatch[1].toUpperCase();
              }
            } else if (setNumber) {
              if (setNumber.endsWith('a')) {
                item['setNumber'] = setNumber.slice(0, -1).toUpperCase() + 'a';
              } else if (setNumber.endsWith('b')) {
                item['setNumber'] = setNumber.slice(0, -1).toUpperCase() + 'b';
              } else {
                item['setNumber'] = setNumber.trim().toUpperCase();
              }
            } else {
              item['setNumber'] = '';
            }
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
              if (
                (/^\d+$/.test(item['setNumber']) &&
                  item['release-date'] === '2003-10-01') ||
                item['release-date'] === '2005-11-01' ||
                item['release-date'] === '2006-09-01' ||
                item['name'] === 'Pikachu [Holo]'
              ) {
                setPrefix = 'np';
              }

              if (
                (/^\d+$/.test(item['setNumber']) &&
                  item['release-date'] === '1999-07-01') ||
                [
                  '121772',
                  '88066',
                  '87395',
                  '87416',
                  '87417',
                  '88068',
                  '88069',
                  '85111',
                  '87397',
                  '83648',
                ].includes(item['tcg-id'])
              ) {
                setPrefix = 'basep';
              }

              if (
                /^\d+$/.test(item['setNumber']) &&
                svpCardList.includes(`${item['name']} ${item['setNumber']}`)
              ) {
                setPrefix = 'svp';
              }

              // Set setName to "Pokémon Futsal Collection" if name contains "on the Ball"

              // Compare setPrefix to setIds keys and set the value as the item setName
              const setIdKey = Object.keys(setIds).find(
                (key) => key === setPrefix
              );
              if (item['name'].includes('on the Ball')) {
                item['setName'] = 'Pokémon Futsal Collection';
              } else if (setIdKey) {
                item['setName'] = setIds[setIdKey];
              }
            }

            // Add setId if setName matches a value in setIds
            const setIdKey = Object.keys(setIds).find(
              (key) => setIds[key] === item['setName']
            );
            if (setIdKey) {
              let prefix = '';
              if (item['setNumber'].startsWith('TG')) {
                prefix = 'tg';
              } else if (item['setNumber'].startsWith('GG')) {
                prefix = 'gg';
              } else if (item['setNumber'].startsWith('SV')) {
                prefix = 'sv';
              }
              item['setId'] = `${setIdKey}${prefix ? prefix : ''}-${
                item['setNumber']
              }`;
            }

            // Special handling for setNumber starting with "SV"
            if (
              item['setNumber'].startsWith('SV') &&
              item['setName'] === 'Hidden Fates'
            ) {
              item['setId'] = `sma-${item['setNumber']}`;
            } else if (item['setNumber'].startsWith('SWSH')) {
              item['setId'] = `swshp-${item['setNumber']}`;
            }

            // Check if needSuffix contains the combination of setName and setNumber
            if (needSuffix.includes(`${item['name']} ${item['setId']}`)) {
              item['setId'] += 'a';
            }

            if (item['setId'] === 'sm1-' && smEnergies[item['name']]) {
              item['setNumber'] = smEnergies[item['name']];
              item['setId'] = `sm1-${item['setNumber']}`;
            }

            // Check if name matches a key in basicSVEnergies and setNumber matches any value in the array
            if (
              basicSVEnergies[item['name']] &&
              basicSVEnergies[item['name']].includes(item['setNumber'])
            ) {
              item['setId'] = `sve-${item['setNumber']}`;
            }

            // Check if setName is "Celebrations" and name matches a key in celebrationsClassic
            if (
              item['setName'] === 'Celebrations' &&
              celebrationsClassic[item['name']]
            ) {
              const match = celebrationsClassic[item['name']].match(/-(\d+)_/);
              if (match && match[1] === item['setNumber']) {
                item['setName'] = 'Celebrations: Classic Collection';
                item['setId'] = celebrationsClassic[item['name']];
              }
            }

            // Check if setName is "Plusle & Minun" and name matches a key in plusleMinunCards
            if (
              item['setName'] === 'Plusle & Minun' &&
              plusleMinunCards[item['name']]
            ) {
              const cardValues = plusleMinunCards[item['name']];
              for (const value of cardValues) {
                const match = value.match(/-(\d+)/);
                if (match && match[1] === item['setNumber']) {
                  item['setId'] = value;
                  break;
                }
              }
            }

            // Check if setName is "EX Latias & Latios" and name matches a key in latiosLatiasCards
            if (
              item['setName'] === 'EX Latias & Latios' &&
              latiosLatiasCards[item['name']]
            ) {
              const cardValues = latiosLatiasCards[item['name']];
              for (const value of cardValues) {
                const match = value.match(/-(\d+)/);
                if (match && match[1] === item['setNumber']) {
                  item['setId'] = value;
                  break;
                }
              }
            }

            if (item['setId'] === 'ecard2-103a' && item['name'] === 'Porygon') {
              item['setId'] = 'ecard2-103'
            }
  
            if (item['setId'] === 'ecard2-50a' && item['name'] === 'Golduck') {
              item['setId'] = 'ecard2-50'
            }

            if (item['setId'] === 'xy10-111' && item['name'] === 'Shauna') {
              item['setId'] = 'xy10-111a'
            }

            if (item['setId'] === 'sm2-157a' && item['name'] === 'Metagross GX') {
              item['setId'] = 'sm2-157'
            }

            if (item['setId'] === 'sm35-77' && item['name'] === 'Zoroark GX') {
              item['setId'] = 'sm35-77a'
            }

            if (item['setId'] === 'sm11-191' && item['name'] === 'Cherish Ball') {
              item['setId'] = 'sm11-191a'
            }

            if (item['setId'] === 'swsh45-65 [HOLO]' && item['name'] === 'Ball Guy') {
              item['setId'] = 'swsh45-65'
            }

            if (item['setId'] === 'swsh8-185 [HOLO]' && item['name'] === 'Genesect V') {
              item['setId'] = 'swsh8-185'
            }

            if (item['setId'] === 'swsh10tg-TG11 [HOLO]' && item['name'] === 'Bronzong') {
              item['setId'] = 'swsh10tg-TG11'
            }

            if (item['setId'] === 'swsh12pt5-98 [V HOLO]' && item['name'] === 'Zamazenta V') {
              item['setId'] = 'swsh12pt5-98'
            }

            if (item['setNumber'] === 'SVP030' && item['name'] === 'Chien-Pao ex') {
              item['setId'] = 'svp-30'
            }

            if (item['setNumber'] === 'SVP030' && item['name'] === 'Chien-Pao ex') {
              item['setId'] = 'svp-30'
            }

            return item;
          });

       

          // Write updated JSON to a new file
          console.log('Writing JSON to file...');
          fs.writeFileSync(
            jsonFilePath,
            JSON.stringify(updatedJsonObj, null, 2),
            'utf8'
          );
          console.log(
            'CSV file has been converted to JSON and written to price-guide.json'
          );
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
