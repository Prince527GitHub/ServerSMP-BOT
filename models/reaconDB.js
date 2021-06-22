const { reconDB } = require("reconlx");
const client = require('../index');

const db = new reconDB(client, {
    uri: process.env.MONGO,
});

module.exports = db;
