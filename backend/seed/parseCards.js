const fs = require('fs');
const path = require('path');

// Step 1: Read the allSetsData.json file
const filePath = path.join(__dirname, 'allSetsData.json');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Step 2: Parse the JSON data
    const jsonData = JSON.parse(data);

    // Step 3: Extract required attributes from nested arrays
    const filteredData = jsonData.flatMap(nestedArray => 
        nestedArray.map(item => {
            const tcgplayer = item.tcgplayer;
            const prices = tcgplayer ? tcgplayer.prices : null;
            const firstMarketPrice = prices ? Object.values(prices)[0] : null;
            return {
                id: item.id,
                name: item.name,
                images: item.images,
                setId: item.set.id,
                price: firstMarketPrice ? firstMarketPrice.market : null,
            };
        })
    );

    // Step 4: Write the new JSON object to a new file
    fs.writeFile('filteredSetsData.json', JSON.stringify(filteredData, null, 4), err => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Filtered data written to filteredSetsData.json');
    });
});