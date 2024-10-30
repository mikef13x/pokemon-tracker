const fs = require('fs');
const path = require('path');

// Step 1: Read the JSON file
const filePath = path.join(__dirname, 'allSetsData.json');
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Step 2: Parse the JSON data
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
    return;
  }

  // Step 3: Iterate through each array and then through each object to extract the `artist`, `subtypes`, `rarity`, and `name` keys
  const artists = new Set();
  const subtypes = new Set();
  const rarities = new Set();
  const setNames = {};

  jsonData.forEach((array) => {
    array.forEach((item) => {
      if (item.artist) {
        artists.add(item.artist);
      }
      if (item.subtypes) {
        item.subtypes.forEach((subtype) => subtypes.add(subtype));
      }
      if (item.rarity) {
        rarities.add(item.rarity);
      }
      if (item.set && item.set.id && item.set.name) {
        setNames[item.set.id] = item.set.name;
      }
    });
  });

  // Step 4: Sort the arrays alphabetically
  const sortedArtists = [...artists].sort();
  const sortedSubtypes = [...subtypes].sort();
  const sortedRarities = [...rarities].sort();
  const sortedSetNames = Object.entries(setNames)
    .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  // Step 5: Write the sorted arrays to a new file
  const outputData = {
    artists: sortedArtists,
    subtypes: sortedSubtypes,
    rarities: sortedRarities,
    setNames: sortedSetNames,
  };

  fs.writeFile('artists_subtypes_rarities.json', JSON.stringify(outputData, null, 2), 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing the file:', writeErr);
      return;
    }
    console.log('Artists, subtypes, rarities, and set names have been saved to artists_subtypes_rarities.json');
  });
});
