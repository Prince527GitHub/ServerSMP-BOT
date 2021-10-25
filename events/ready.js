const { blacklistedwords } = require('../collection/index');
const Schema = require('../models/blackwords');
const { readdirSync } = require('fs');
//const Nuggies = require('nuggies');
const client = require("../index");
const ultrax = require('ultrax');
const chalk = require('chalk');
const sleep = ultrax.sleep;

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
  const readyText = [
      `\n${chalk.green.bold("Success!")}`,
      `${chalk.gray("Connected To")} ${chalk.yellow(`${client.user.tag}`)}`,
      `${chalk.white("Watching")} ${chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`)} ${chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users + Bots," : "User,"}`)} ${chalk.red(`${client.guilds.cache.size}`)} ${chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)}`,
      `${chalk.white(`Prefix:` + chalk.red(` ${process.env.PREFIX}`))} ${chalk.white("||")} ${chalk.red(`${Number(client.commands.size) + Number(client.slashCommands.size)}`)} ${chalk.white(`Commands`)}\n`,
  ]

  console.log(readyText.join("\n"));

  // Blacklisted words
  Schema.find()
    .then((data) => {
      data.forEach((val) => {
        blacklistedwords.set(val.Guild, val.Words)
    })
  })

  // Stats used for the site https://api.serversmp.xyz/bot
  await client.db_mongo.set(`${client.user.username}-guilds`, client.guilds.cache.size);
  await client.db_mongo.set(`${client.user.username}-users`, client.users.cache.size);
  await client.db_mongo.set(`${client.user.username}-channels`, client.channels.cache.size);
  await client.db_mongo.set(`${client.user.username}-commands`, `${Number(client.commands.size) + Number(client.slashCommands.size)}`);
  if(await client.db_mongo.has(`${client.user.username}-cmdUsed`) === false) {
    await client.db_mongo.set(`${client.user.username}-cmdUsed`, "0");
  }

  // Giveaway
  //Nuggies.giveaways.startAgain(client);

  // Dashboard
  require("../dashboard/index.js")(client);

});
