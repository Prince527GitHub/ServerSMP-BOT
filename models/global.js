const { Schema, model } = require('mongoose');

module.exports = model('channels', new Schema({
    Guild: String,
    Channel: String,
    Author: String,
    Activated: Boolean,
}));