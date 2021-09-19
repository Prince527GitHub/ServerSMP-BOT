const { Schema, model } = require('mongoose');

module.exports = model('guild-rankcard', new Schema({
    Guild: String,
    ProgressOption: Boolean,
    ProgressBar: String,
    StatusStyle: Boolean,
    BackgroundOption: Boolean,
    Background: String,
}));