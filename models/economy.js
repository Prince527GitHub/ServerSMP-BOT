const { Schema, model } = require('mongoose');

module.exports = model('economy', new Schema({
    id: String,
    coins: Number
}));