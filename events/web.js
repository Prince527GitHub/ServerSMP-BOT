const Client = require('../index');
const express = require("express");
const app = express();
const socketStats = require("socketstats");
const _PORT = process.env.PORT || 8080;

Client.on('ready', async () => {
    const server = new socketStats(app, Client);
    server.listen(_PORT, () => {
        console.log("Listening to port: "+_PORT);
    });
})
