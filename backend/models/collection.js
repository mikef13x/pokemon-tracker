const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
    name: String,
    image: String,
})

const collectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  cards: [cardSchema]

});

const Collection = model('Collection', collectionSchema);

module.exports = Collection;
