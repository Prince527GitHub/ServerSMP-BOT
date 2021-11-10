const { Schema, model } = require('mongoose');

module.exports = model('poll', new Schema({
  Code: String,
  Passcode: String,
  Question: String,
  True: String,
  False: String,
  IPs: Array,
}));