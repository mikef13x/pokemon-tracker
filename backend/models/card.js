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
  grade7: { type: Number, default: null },
  grade8: { type: Number, default: null },
  grade9: { type: Number, default: null },
  bgs95: { type: Number, default: null },
  psa10: { type: Number, default: null },
  bgs10: { type: Number, default: null },
  cgc10: { type: Number, default: null },
  raw: { type: Number, default: null },
},)

const monthlyAveragesSchema = new Schema({
  month: { type: String, required: true },
  grade7Avg: { type: Number, default: null },
  grade8Avg: { type: Number, default: null },
  grade9Avg: { type: Number, default: null },
  bgs95Avg: { type: Number, default: null },
  psa10Avg: { type: Number, default: null },
  bgs10Avg: { type: Number, default: null },
  cgc10Avg: { type: Number, default: null },
  rawAvg: { type: Number, default: null },
});

const weeklyAveragesSchema = new Schema({
  week: { type: String, required: true },
  grade7Avg: { type: Number, default: null },
  grade8Avg: { type: Number, default: null },
  grade9Avg: { type: Number, default: null },
  bgs95Avg: { type: Number, default: null },
  psa10Avg: { type: Number, default: null },
  bgs10Avg: { type: Number, default: null },
  cgc10Avg: { type: Number, default: null },
  rawAvg: { type: Number, default: null },
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
