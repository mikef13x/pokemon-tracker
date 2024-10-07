const { Schema, model } = require('mongoose');

const collectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

const Collection = model('Collection', collectionSchema);

module.exports = Collection;
