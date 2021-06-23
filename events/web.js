const client = require('../index');
const express = require("express");
const path = require('path');
const serveIndex = require('serve-index');
const app = express();
//const socketStats = require("socketstats");
//const server = new socketStats(app, client);
const _PORT = process.env.PORT || 8080;

client.on('ready', async () => {
  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size
  }
  app.use("/", express.static('website'));
  app.use("/", serveIndex('website'));
  //app.get("/", (req, res) => {
  //  res.status(200).sendFile(path.join(__dirname, "..", "website", "index.html"))
  //})
  app.get("/info", (req, res) => {
    res.status(200).send(clientDetails)
  })
  app.listen(_PORT)
  //server.listen(8080)
  console.log(`Listening to ports: ${_PORT}`);
})
