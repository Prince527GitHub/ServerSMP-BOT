const { Schema, model } = require('mongoose');

module.exports = cmds = model('cmds', new Schema({
    Guild: String,
    Cmds: Array
}));
