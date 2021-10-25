const { Schema, model } = require('mongoose');

module.exports = model('user-stats', new Schema({
  User: String,
  CmdUsed: String
}));
