const express = require("express");
const app = express();
const _PORT = process.env.PORT || 8080;

client.on('ready', async () => {
    const socketStats = require("socketstats");
    const server = new socketStats(app, client);
    server.listen(_PORT, () => {
        console.log("Listening to port: "+_PORT);
    });
})