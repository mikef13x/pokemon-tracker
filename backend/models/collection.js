const { Schema, model } = require('mongoose');

const collectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  cards: [cardSchema]

});

const Collection = model('Collection', collectionSchema);

module.exports = Collection;
