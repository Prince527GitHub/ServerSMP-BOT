const { Schema, model } = require('mongoose');

module.exports = model('goodbye-channel', new Schema({
    Guild: String,
    Channel: String,
}));