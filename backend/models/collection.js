const { Schema, model } = require('mongoose');

const collectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  collectionName: {
    type: String,
    required: true,
    trim: true,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  isMain: {
    type: Boolean,
    default: false,
  },
});

const Collection = model('Collection', collectionSchema);

module.exports = Collection;
