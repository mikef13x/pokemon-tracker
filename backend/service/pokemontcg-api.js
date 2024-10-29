const router = require('express').Router();
require('dotenv').config();
const pokemon = require('pokemontcgsdk');
const fs = require('fs');
const path = require('path');
const Card = require('../models/card')

pokemon.configure({ apiKey: process.env.POKE_API_KEY });

// returns array of all cards based on specified pokemon name
router.get('/pokemonName/:pokemonName', async (req, res) => {
  try {
    console.log('pokemon name:', req.params.pokemonName);
    const result = await pokemon.card.where({ q: `name:${req.params.pokemonName}` });

    const data = result.data
    console.log("data elements:", data.length)
    data.forEach(element => {
      console.log(element.name, element.id)
    });
    res.json(data); 
  } catch (err) {
    res.status(500).json(err);
  }
});

// returns array of all cards in specified set 
router.get('/sets/:setId', async (req, res) => {
  try {
    const result = await pokemon.card.all({ q: `set.id:${req.params.setId}` })
    console.log(result)

    res.json(result); 
  } catch (err) {
    res.status(500).json(err);
  }
});

//returns array of cards based on provided query parameters
// request ex: { "q": "set.id:sv3pt5 name:blastoise " }
router.post('/queryCard', async (req, res) => {
  try {
    console.warn("attempting query")
    const result = await pokemon.card.all(req.body)
    console.log(result)

    res.json(result); 
  } catch (err) {
    res.status(500).json(err);
  }
});


// returns array of every pokemon set
router.get('/sets', async (req, res) => {
  try {
    const result = await pokemon.set.all()
    console.log(result)

    res.json(result); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/seed', async (req, res) => {
  try {
    await Card.collection.drop();
    console.log('Card collection dropped');

    let filePath = path.join(__dirname, '../seed/filteredSetsData.json');
    console.log(`Reading file from: ${filePath}`);
    let jsonData = fs.readFileSync(filePath, 'utf-8');
    let cards = JSON.parse(jsonData);

    const addedCards = [];
    const skippedCards = [];

    for (const card of cards) {
      try {
        const existingCard = await Card.findOne({ cardId: card.id });
        if (existingCard) {
          skippedCards.push(card);
          continue;
        }

        const newCard = new Card({
          name: card.name,
          image: card.images.large,
          cardId: card.id,
          cardType: card.cardType,
          pokemonType: card.pokemonType,
          subType: card.subType,
          artist: card.artist,
          setId: card.setId,
          setName: card.setName,
          releaseDate: card.releaseDate,
          rarity: card.rarity,
          price: card.price,

        });
        await newCard.save();
        addedCards.push(newCard);
      } catch (error) {
        console.error(`Error saving cardId: ${card.id}`, error);
        throw error;
      }
    }
// Japanese card set
    // filePath = path.join(__dirname, '../seed/jpnFilteredSetsData.json');
    // console.log(`Reading file from: ${filePath}`);
    // jsonData = fs.readFileSync(filePath, 'utf-8');
    // cards = JSON.parse(jsonData);

    // for (const card of cards) {
    //   try {
    //     const existingCard = await Card.findOne({ cardId: card.id });
    //     if (existingCard) {
    //       skippedCards.push(card);
    //       continue;
    //     }

    //     const newCard = new Card({
    //       name: card.name,
    //       image: card.images,
    //       cardId: card.id,
    //       cardType: card.cardType || null,
    //       setId: card.setId || "jpn",
    //       setName: card.setName,
    //       releaseDate: card.releaseDate || null,
    //       price: card.price,
    //     });
    //     await newCard.save();
    //     addedCards.push(newCard);
    //   } catch (error) {
    //     console.error(`Error saving cardId: ${card.id}`, error);
    //     throw error;
    //   }
    // }

    res.json({ addedCards, skippedCards });
  } catch (error) {
    console.error('Error seeding cards from JSON', error);
    res.status(500).json({ message: 'Failed to seed cards from JSON', error });
  }
});


module.exports = router;