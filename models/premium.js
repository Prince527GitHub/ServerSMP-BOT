const { Schema, model } = require('mongoose');

module.exports = model('premium', new Schema({
    Guild: String,
}));