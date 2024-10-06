const router = require('express').Router();
require('dotenv').config();
import pokemon from 'pokemontcgsdk';


pokemon.configure({apiKey: process.env.POKE_API_KEY})

router.get('/:pokemonName', async (req, res) => {
  try {
    console.log('pokemon name:', req.params.pokemonName);
    const pokemonArray = await pokemon.card.where({q: `name:${req.params.pokemonName}`})
    return pokemonArray
  } catch (err) {
    res.status(500).json(err);
  }
});
