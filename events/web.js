const client = require('../index');
const express = require("express");
const serveIndex = require('serve-index');
const model = require('../models/economy');
const { getCommands } = require('../web/utils/index');
const app = express();
const _PORT = process.env.PORT || 8080;

client.on('ready', async () => {
  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size
  }
  app.use('/web', express.static('web'));
  app.use('/web', serveIndex('web'));
  app.get("/", (req, res) => {
    res.status(200).render('../web/views/index.pug')
  })
  app.get("/commands", (req, res) => {
    const commands = getCommands();
    res.status(200).render('../web/views/commands.ejs', { commands })
  })
  app.get("/economy", (req, res) => {
    const user = req.query.user;
    if(!user) {
      model.find({}, async (err, data) => res.send(data));
      return;
    }
    model.findOne({ authorID: user }, async(err, data) => {
      if(!data) return res.send('User does not exist in database!');
      res.send(data);
    })
  })
  app.get("/info", (req, res) => {
    res.status(200).send(clientDetails)
  })
  app.listen(_PORT)
  console.log(`WebServer ✅ (${_PORT})`);
})
