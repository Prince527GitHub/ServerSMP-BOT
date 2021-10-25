const { Schema, model } = require('mongoose');

module.exports = model('custom-commands-slash', new Schema({
  guildId: String,
  commandName: String,
  response: String,
}));
