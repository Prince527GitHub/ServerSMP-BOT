const { Schema, model } = require('mongoose');

module.exports = blacklistedwords = model('textSystem-guild', new Schema({
    Guild: String,
    Channel: String
}));