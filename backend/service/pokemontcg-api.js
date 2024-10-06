const router = require('express').Router();
import pokemon from 'pokemontcgsdk'

pokemon.configure({apiKey: '123abc'})

router.get('/', async (req, res) => {
  try {
    console.log('route');
  } catch (err) {
    res.status(500).json(err);
  }
});
