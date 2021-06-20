const { Schema, model } = require('mongoose');

module.exports = model('custom-commands', new Schema({
    Guild: String,
    Command: String,
    Response: String
}));