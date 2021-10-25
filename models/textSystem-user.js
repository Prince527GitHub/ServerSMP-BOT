const { Schema, model } = require('mongoose');

module.exports = blacklistedwords = model('textSystem-user', new Schema({
    User: String,
    Score: String,
}));