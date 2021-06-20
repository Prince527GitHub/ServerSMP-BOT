const { Schema, model } = require('mongoose');

module.exports = model('money-user', new Schema({
    User: String,
}));