const { Schema, model } = require('mongoose');

module.exports = model('birthday', new Schema({
    User: String,
    Birthday: String,
}));
