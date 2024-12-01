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

const priceHistorySchema = new Schema({
  date: { type: Date, required: true },
  grade7: { type: Number },
  grade8: { type: Number },
  grade9: { type: Number },
  bgs95: { type: Number },
  psa10: { type: Number },
  bgs10: { type: Number },
  cgc10: { type: Number },
  raw: { type: Number },
});

const monthlyAveragesSchema = new Schema({
  month: { type: String, required: true },
  grade7Avg: { type: Number },
  grade8Avg: { type: Number },
  grade9Avg: { type: Number },
  bgs95Avg: { type: Number },
  psa10Avg: { type: Number },
  bgs10Avg: { type: Number },
  cgc10Avg: { type: Number },
  rawAvg: { type: Number },
});

const weeklyAveragesSchema = new Schema({
  week: { type: String, required: true },
  grade7Avg: { type: Number },
  grade8Avg: { type: Number },
  grade9Avg: { type: Number },
  bgs95Avg: { type: Number },
  psa10Avg: { type: Number },
  bgs10Avg: { type: Number },
  cgc10Avg: { type: Number },
  rawAvg: { type: Number },
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
  prices: priceSchema,
  rarity: { type: String },
  priceHistory: [priceHistorySchema],
  weeklyAverages: [weeklyAveragesSchema],
  monthlyAverages: [monthlyAveragesSchema],
});

const Card = model('Card', cardSchema);

module.exports = Card;
