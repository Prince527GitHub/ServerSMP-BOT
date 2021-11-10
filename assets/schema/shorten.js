const { Schema, model } = require('mongoose');

module.exports = model('shorten', new Schema({
  Code: String,
  Url: String,
}));