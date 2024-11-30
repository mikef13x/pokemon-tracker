const { Schema, model } = require('mongoose');

// PriceHistory Schema
const priceHistorySchema = new Schema({
  cardId: { type: String, required: true, index: true }, // Reference to the Card
  date: { type: Date, required: true, default: Date.now }, // Timestamp for the price snapshot
  grade7: { type: Number },
  grade8: { type: Number },
  grade9: { type: Number },
  grade95: { type: Number },
  psa10: { type: Number },
  bgs10: { type: Number },
  cgc10: { type: Number },
  raw: { type: Number },
});

// Create index on cardId and date for efficient queries
priceHistorySchema.index({ cardId: 1, date: -1 });

const PriceHistory = model('PriceHistory', priceHistorySchema);

module.exports = PriceHistory;