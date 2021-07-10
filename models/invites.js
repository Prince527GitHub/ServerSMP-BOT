const { Schema, model } = require('mongoose');

module.exports = model('invite-channel', new Schema({
    Guild: String,
    Channel: String,
}));
