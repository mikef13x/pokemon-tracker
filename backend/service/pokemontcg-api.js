const router = require('express').Router();
require('dotenv').config();
const pokemon = require('pokemontcgsdk');

pokemon.configure({ apiKey: process.env.POKE_API_KEY });

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

router.get('/sets/:setId', async (req, res) => {
  try {
    const result = await pokemon.card.all({ q: `set.id:${setId}` })
    console.log(result)

    res.json(result); 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
