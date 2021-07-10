const client = require('../index');
const { chatBot } = require('reconlx');
const Schema = require('../models/chatbot-channel');

client.on("message", async(message) => {
  if(!message.guild || message.author.bot) return;
  Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;
    if(message.channel.id !== data.Channel) return;
    const p = await client.prefix(message)
    const args = message.content.slice(p.length).trim().split(/ +/g);
    chatBot(message, args.join(" "));
  })
})
