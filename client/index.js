const client = require('../index');
const { GiveawayClient } = require('reconlx');

const giveaway = new GiveawayClient(client, {
    mongoURI: process.env.MONGO,
    emoji: "🎉",
    defaultcolor: "00FFF9"
})

module.exports = giveaway;
