const { Schema, model } = require('mongoose');

module.exports = model('account', new Schema({
  Username: String,
  Password: String,
  Token: String,
}));