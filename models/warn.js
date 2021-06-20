const { Schema, model } = require('mongoose');

module.exports = warndata = model('warns', new Schema({
    guildid: String,
    user: String,
    content: Array
}));