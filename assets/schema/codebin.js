const { Schema, model } = require('mongoose');

module.exports = model('codebin', new Schema({
  Code: String,
  Text: String,
}));