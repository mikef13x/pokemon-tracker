const { Schema, model } = require('mongoose');

// Price data for daily and monthly averages
const priceSchema = new Schema({
  grade7: { type: Number },
  grade8: { type: Number },
  grade9: { type: Number },
  grade95: { type: Number },
  psa10: { type: Number },
  bgs10: { type: Number },
  cgc10: { type: Number },
  raw: { type: Number },
});

// Schema for Card model
const cardSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  cardId: { type: String, required: true, unique: true },
  setId: { type: String },
  setName: { type: String },
  releaseDate: { type: Date },
  cardType: { type: String },
  pokemonType: [{ type: String }],
  subType: [{ type: String }],
  artist: { type: String },
  prices: priceSchema,  // Stores current prices
  rarity: { type: String },

  // Stores daily prices
  priceHistory: [{
    date: { type: Date, required: true }, // Date of the daily price entry
    grade7: { type: Number },
    grade8: { type: Number },
    grade9: { type: Number },
    grade95: { type: Number },
    psa10: { type: Number },
    bgs10: { type: Number },
    cgc10: { type: Number },
    raw: { type: Number },
  }],

  // Stores monthly average prices
  monthlyAverages: [{
    month: { type: String, required: true },  // Format: "YYYY-MM"
    grade7Avg: { type: Number },
    grade8Avg: { type: Number },
    grade9Avg: { type: Number },
    grade95Avg: { type: Number },
    psa10Avg: { type: Number },
    bgs10Avg: { type: Number },
    cgc10Avg: { type: Number },
    rawAvg: { type: Number },
  }],
});

const Card = model('Card', cardSchema);

module.exports = Card;
