const { Schema, model } = require('mongoose');

module.exports = model('premium-user', new Schema({
    User: String,
}));
