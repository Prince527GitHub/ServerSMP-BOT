const { reconDB } = require("reconlx");
const config = require('../config.json');
const client = require('../index');

const db = new reconDB(client, {
    uri: config.mongo,
});

module.exports = db;