const { Schema, model } = require('mongoose');

module.exports = model('premium-guild', new Schema({
    Guild: String,
    Expire: Number,
    Permanent: Boolean,
}));
