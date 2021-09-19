const { Schema, model } = require('mongoose');

module.exports = model('user-rankcard', new Schema({
    User: String,
    ProgressBar: String,
    StatusStyle: Boolean,
    StatusType: String,
    Background: String,
}));