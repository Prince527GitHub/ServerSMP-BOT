const { Schema, model } = require('mongoose');

module.exports = blacklistedwords = model('chatbot', new Schema({
    Guild: String,
    Channel: String,
}));
