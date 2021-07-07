const { Schema, model } = require('mongoose');

module.exports = blacklistserver = model('blacklistedservers', new Schema({
    Server: String,
}));
