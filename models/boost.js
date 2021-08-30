const { Schema, model } = require('mongoose');

module.exports = model('boost-channel', new Schema({
    Guild: String,
    Channel: String,
}));