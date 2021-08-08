const client = require('../index');
const Schema = require('../models/blackwords');
const Nuggies = require('nuggies');
const { blacklistedwords } = require('../collection/index');
require('dotenv').config();

client.on('ready', async() => {

  const activityName = process.env.STATUS
  .replace(/{guildsCount}/g, await client.guilds.cache.size)
  .replace(/{usersCount}/g, await client.users.cache.size)
  .replace(/{channelsCount}/g, await client.channels.cache.size);

  client.user.setPresence({
    status: 'dnd',
    activity: {
      name: activityName ?? "DiamondGolurk on youtube.com",
      type: process.env.STATUS_TYPE.toUpperCase() | null ?? "WATCHING"
    }
  }).catch(e => {
    console.log("Error while setting the presence, reason: " + e)
  })
  console.log(`${client.user.username} ✅`)
  Schema.find()
    .then((data) => {
      data.forEach((val) => {
        blacklistedwords.set(val.Guild, val.Words)
      })
    })
    Nuggies.giveaways.startAgain(client);
})
