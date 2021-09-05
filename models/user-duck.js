const { Schema, model } = require('mongoose');

module.exports = model('user-duck', new Schema({
    User: String,
    URL: String,
}));