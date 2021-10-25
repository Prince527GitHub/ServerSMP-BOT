const { Schema, model } = require('mongoose');

module.exports = model('role-color', new Schema({
    Guild: String,
    Color: Array,
    List: Array,
}));
