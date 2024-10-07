const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
    name: String,
    image: String,
})

const Card = model('Card', cardSchema);

module.exports = Card;