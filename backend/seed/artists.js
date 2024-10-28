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

    // Step 3: Iterate through each array and then through each object to extract the `artist` key
    const artists = new Set();
    jsonData.forEach(array => {
        array.forEach(item => {
            if (item.artist) {
                artists.add(item.artist);
            }
        });
    });

    // Step 4: Write the array to a new file
    fs.writeFile('artists.json', JSON.stringify([...artists], null, 2), 'utf8', writeErr => {
        if (writeErr) {
            console.error('Error writing the file:', writeErr);
            return;
        }
        console.log('Artists array has been saved to artists.json');
    });
});