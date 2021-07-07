const client = require('../index');
const Schema = require('../models/blackwords');
const {
  blacklistedwords
} = require('../collection/index');
require('dotenv').config();
const STATUS = process.env.STATUS;

client.on('ready', () => {
  client.user.setPresence({
    status: 'dnd',
    activity: {
      name: STATUS || "DiamondGolurk on youtube.com",
      type: "WATCHING"
    }
  })
  console.log(`${client.user.username} ✅`)
  Schema.find()
    .then((data) => {
      data.forEach((val) => {
        blacklistedwords.set(val.Guild, val.Words)
      })
    })
})
