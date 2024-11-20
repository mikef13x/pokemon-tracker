const { Schema, model } = require('mongoose');

const priceSchema = new Schema({
  grade7: { type: Number },
  grade8: { type: Number },
  grade9: { type: Number },
  grade95: { type: Number },
  psa10: { type: Number },
  bgs10: {type: Number },
  cgc10: { type: Number },
  raw: { type: Number },
})

const cardSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  cardId: { type: String, required: true, unique: true },
  setId: { type: String },
  setName: {type: String},
  releaseDate: {type: Date},
  cardType: {type: String},
  pokemonType: [{type: String}],
  subType: [{type: String}],
  artist: {type: String},
  prices: priceSchema,
  rarity: {type: String}
});

const Card = model('Card', cardSchema);

module.exports = Card;
