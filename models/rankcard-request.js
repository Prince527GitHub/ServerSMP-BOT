const { Schema, model } = require('mongoose');

module.exports = model('rankcard-request', new Schema({
    Mesaage: String,
    User: String,
    Background: String,
}));
