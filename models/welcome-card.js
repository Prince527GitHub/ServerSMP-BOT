const { Schema, model } = require('mongoose');

module.exports = model('welcome-card', new Schema({
    Guild: String,
    Channel: String,
    Background: String,
    Color: String,
    FontPath: String,
    FontName: String,
}));
