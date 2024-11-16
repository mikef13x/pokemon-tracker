const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Read sets.json file
const setsFilePath = path.join(__dirname, 'sets.json');
const sets = JSON.parse(fs.readFileSync(setsFilePath, 'utf8'));

// Function to fetch data for each set ID
const fetchSetData = async (setId) => {
    console.log(setId)
  try {
    const response = await axios.get(`http://localhost:3001/pokemon-api/sets/${setId}`);
    console.log(`Fetched data for set ID ${setId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for set ID ${setId}:`, error);
    return null;
  }
};

// Helper function to introduce a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Main function to fetch data for all sets and save to a single JSON file
const fetchAllSetsData = async () => {
  const allSetsData = [];

  for (const set of sets) {
    if (!set.id) {
      console.error('Set ID is missing:', set);
      continue;
    }
    console.log(`Fetching data for set ID: ${set.id}`);
    const setData = await fetchSetData(set.id);
    if (setData) {
      allSetsData.push(setData);
    }
    // Pause for 2.5 seconds before the next request
    await delay(2500);
  }

  // Save all sets data to a single JSON file
  const outputFilePath = path.join(__dirname, 'allSetsData.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(allSetsData, null, 2));
  console.log(`All sets data saved to ${outputFilePath}`);
};

// Run the main function
fetchAllSetsData();