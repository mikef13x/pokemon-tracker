const router = require('express').Router();
require('dotenv').config();
const pokemon = require('pokemontcgsdk');

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

module.exports = router;
