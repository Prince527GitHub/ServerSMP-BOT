const { Schema, model } = require('mongoose');

module.exports = blacklistedwords = model('blacklisted-words', new Schema({
    Guild: String,
    Words: Array
}));
