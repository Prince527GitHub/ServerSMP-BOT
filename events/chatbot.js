const client = require('../index');
const { chatBot } = require('reconlx');
const fetch = require('node-fetch').default;
const Schema = require('../models/chatbot-channel');

client.on("messageCreate", async(message) => {
  if(!message.guild || message.author.bot) return;
  Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;
    if(message.channel.id !== data.Channel) return;
    if(process.env.CHAT_BOT === "false") {
      fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
      .then(response => response.json())
      .then(data => {
        message.channel.send(data.response)
      })
    } else {
      fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&key=${process.env.CHAT_BOT}`)
      .then(response => response.json())
      .then(data => {
        message.channel.send(data.response)
      })
    }
  })
})
