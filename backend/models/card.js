const { Schema, model } = require('mongoose');

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
  price: {type: Number},
  rarity: {type: String}
});

const Card = model('Card', cardSchema);

module.exports = Card;
