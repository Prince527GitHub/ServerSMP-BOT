const { blacklistedwords } = require('../collection/index');
const Schema = require('../models/blackwords');
//const Nuggies = require('nuggies');
const client = require("../index");

client.on("ready", async() => {

  // Change status
  const activityName = process.env.STATUS
    .replace(/{guildsCount}/g, await client.guilds.cache.size)
    .replace(/{usersCount}/g, await client.users.cache.size)
    .replace(/{channelsCount}/g, await client.channels.cache.size)
    .replace(/{botPrefix}/g, process.env.PREFIX);

  // Set presence
  client.user.setPresence({ activities: [{ name: activityName ?? "DiamondGolurk on youtube.com", type: process.env.STATUS_TYPE.toUpperCase() }], status: 'dnd' })

  // Log start
  console.log(`${client.user.username} ✔️`)

  // Blacklisted words
  Schema.find()
    .then((data) => {
      data.forEach((val) => {
        blacklistedwords.set(val.Guild, val.Words)
    })
  })

  // Giveaway
  //Nuggies.giveaways.startAgain(client);

  // Dashboard
  require("../dashboard/index.js")(client);

});
