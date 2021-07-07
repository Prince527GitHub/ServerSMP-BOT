const { Collection } = require('discord.js');

const antijoin = new Collection();
const afk = new Collection();
const snipe = new Collection();
const blacklistedwords = new Collection();

module.exports = { antijoin, afk, snipe, blacklistedwords }
