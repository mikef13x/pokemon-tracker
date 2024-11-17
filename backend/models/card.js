const { Schema, model } = require('mongoose');

const priceSchema = new Schema({
  psa7: { type: String },
  psa8: { type: String },
  psa9: { type: String },
  psa95: { type: String },
  psa10: { type: String },
  raw: { type: String },
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
  prices: [priceSchema],
  rarity: {type: String}
});

const Card = model('Card', cardSchema);

module.exports = Card;
