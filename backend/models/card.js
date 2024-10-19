const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  cardId: { type: String, required: true, unique: true },
  setId: { type: String },
  setName: {type: String},
  releaseDate: {type: Date},
  price: {type: Number},
});

const Card = model('Card', cardSchema);

module.exports = Card;
