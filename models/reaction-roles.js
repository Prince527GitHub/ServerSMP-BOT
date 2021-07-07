const { Schema, model } = require('mongoose');

module.exports = model('reaction-roles', new Schema({
    Guild: String,
    Message: String,
    Roles: Object,
}));
