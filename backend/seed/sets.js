const fs = require('fs');
const path = require('path');

function parseAndSaveSets() {
  // Construct the absolute path to sets.json
  const setsFilePath = path.join(__dirname, 'sets.json');

  // Read the sets.json file
  fs.readFile(setsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading sets.json file', err);
      return;
    }

    try {
      // Parse the JSON data
      const sets = JSON.parse(data);
      const setIds = {};

      // Iterate through the array and extract id and name
      sets.forEach(set => {
        setIds[set.id] = set.name;
      });

      // Write the new JSON object to setIds.json
      const setIdsFilePath = path.join(__dirname, 'setIds.json');
      fs.writeFile(setIdsFilePath, JSON.stringify(setIds, null, 2), (err) => {
        if (err) {
          console.error('Error writing to setIds.json file', err);
        } else {
          console.log('setIds.json has been saved.');
        }
      });
    } catch (parseError) {
      console.error('Error parsing JSON data', parseError);
    }
  });
}

parseAndSaveSets()