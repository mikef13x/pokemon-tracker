const fs = require('fs');
const path = require('path');

// Step 1: Read the allSetsData.json file
const filePath = path.join(__dirname, 'jpnAllSetsData.json');
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
            return {
                id: item.setData.name + "-" + item.printedNumber,
                name: item.name,
                images: item.image_url,
                setId: item.setData.name,
                setName: item.setData.name,
                releaseDate: item.setData.year,
                cardType: item.supertype,
                pokemonType: item.types ? item.types : null,
                subType: item.subtypes ? item.subtypes : null,
                artist: item.artist,
                rarity: item.rarity,
                price: item.prices[0] ? item.prices[0].priceAmount /100 : null,
            };
        })
    );

    // Step 4: Write the new JSON object to a new file
    const outputFilePath = path.join(__dirname, 'jpnFilteredSetsData.json');
    fs.writeFile(outputFilePath, JSON.stringify(filteredData, null, 4), err => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Filtered data written to jpnFilteredSetsData.json');
    });
});