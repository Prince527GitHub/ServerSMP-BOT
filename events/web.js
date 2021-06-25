const client = require('../index');
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const model = require('../models/economy');
const { getCommands } = require('../utils/index');
const app = express();
const _PORT = process.env.PORT || 8080;

client.on('ready', async () => {
  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size
  }
  app.get("/", (req, res) => {
    res.status(200).render('index.pug')
  })
  app.get("/commands", (req, res) => {
    const commands = getCommands();
    res.status(200).render('commands.ejs', { commands })
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
  console.log(`Listening to ports: ${_PORT}`);
})
